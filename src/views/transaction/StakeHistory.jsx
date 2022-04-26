import React, { useState, useEffect } from 'react';
import alertService from "../../services/alert.service"
import { useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import configService from '../../services/config.service';
import TransactionFilter from '../../components/common/TransactionFilter';
import apiService from '../../services/api.service';
import NewTable from '../../components/common/NewTable';
import { GlobalPagination } from '../../components/common/GlobalPagination';
import * as momemt from 'moment';


    const StakeHistory =  () => {
        const {user } = useSelector(state => state.auth);

        const [loading, setLoading] = useState(false);

        const [stackTotalCount, setStackTotalCount] = useState(0);
        const [removeStackTotalCount, setRemoveStackTotalCount] = useState(0);

        const [stackPage, setStackPage] = useState(1);
        const [removeStackPage, setRemoveStackPage] = useState(1);
        
        const [perPage] = useState(10);

        const bscUrl = configService.blockchainExpEndpointUrl();
      
        const [stakeHistoryList, setStakeHistoryList] = useState([]);

        const [removeStakeHistoryList, setRemoveStakeHistoryList] = useState([]);

        const [stackSearch, setStackSearch] = useState("");
        const [removeStackSearch, setRemoveStackSearch] = useState("");

        const setStackPageRecord=(value)=>{
          setStackPage(Number(value)+1)
        }
      
        const setRemoveStackPageRecord=(value)=>{
          setRemoveStackPage(Number(value)+1)
        }

        const setStackSearchRecord=(search)=>{
          setStackSearch(search)
          setStackPage(1)
        }
      
        const setRemoveStackSearchRecord=(search)=>{
          setRemoveStackSearch(search)
          setRemoveStackPage(1)
        }

          useEffect(() => {
            (async () => {
                await createStakeHistory();
                await removeStakeHistory();
            })();
          },[stackPage, removeStackPage, stackSearch, removeStackSearch]);
          

          // Create stake history
          const createStakeHistory = async () => {
            try {
              setLoading(true);
              let _response = await apiService.getCreateStakeHistory(
                stackPage,
                perPage,
                user.wallet_address,
                stackSearch
              );

        
              if(_response.status === "failure"){
                alertService.showError(_response.message);
              setLoading(false);
        
              }
              setStackTotalCount(_response.pagination.totalCount)
        
              let _txns = [..._response.records];
              for(let _txn of _txns){
                _txn["transactionHash"] = _txn.transaction_hash
                _txn["stakeAmount"] = _txn.amount
                _txn["account"] = _txn.wallet_address
                _txn["timestamp"] = momemt.unix(_txn.update_date).format("lll");
                    
              }
              
              setStakeHistoryList(_txns);
        
              setLoading(false);
            } catch (error) {
              alertService.showError(error.message);
            }
          };

        // Remove Stake history

        const removeStakeHistory = async () => {
          try {
            setLoading(true);
            let _response = await apiService.getRemoveStakeHistory(
              removeStackPage,
              perPage,
              user.wallet_address,
              removeStackSearch
            );
            if(_response.status === "failure"){
              alertService.showError(_response.message);
            setLoading(false);
      
            }
            setRemoveStackTotalCount(_response.pagination.totalCount)
      
            let _txns = [..._response.records];
            for(let _txn of _txns){
              _txn["transactionHash"] = _txn.transaction_hash
              _txn["stakeAmount"] = _txn.amount
              _txn["account"] = _txn.wallet_address
              _txn["timestamp"] = momemt.unix(_txn.update_date).format("lll");
                  
            }
            
            setRemoveStakeHistoryList(_txns);
      
            setLoading(false);
          } catch (error) {
            alertService.showError(error.message);
          }
        };

        const columns = [
      
         
          { accessor: "transaction_hash", Header: "Transaction Hash" ,Cell: ({ row }) => (
            <>
            <a
                                      href={bscUrl + "tx/" + row.original.transaction_hash}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {row.original.transaction_hash.slice(0, 5) +
                                        "..." +
                                        row.original.transaction_hash.slice(-4)}
                                    </a>
            </>
          ),},
          { accessor: "timestamp", Header: "TIMESTAMP",  Cell: ({ row }) => (
            <>
             {row.original.timestamp}
            </>
          ), },
          { accessor: "wallet_address", Header: "Account" },
          
          {
            accessor: "stakeAmount",
            id:"stakeAmount",
            Header: "Reward (ELX)",
            Cell: ({ row }) => (
              <>
              {Number(row.original.stakeAmount)|| ""}
              </>
            ),
          },
        
         
      
      
        ];
      
        return (
          <div>
            <div className="content text-coalblack">
              {loading === true ? <Spinner /> : ""}
      
              {/* table */}
              <div className="bg-white rounded-xl border shadow-sm">
                <Tabs>
                  <TabList>
                  <Tab>Create Stake History</Tab>
                  <Tab>Remove Stake History</Tab>
                  </TabList>
      
                  <TabPanel>
                    <div className="overflow-y-auto">
                    <TransactionFilter
                      setSearch={setStackSearchRecord}
                      search={stackSearch}
                    />
                      <NewTable 
                          data={stakeHistoryList}
                          columns={columns}
                          isLoader={loading}
                        />
                      <GlobalPagination
                        totalCount={stackTotalCount || 0}
                        dataCount={stackTotalCount || 0}
                        pageSize={perPage}
                        currentPage={stackPage-1}
                        gotoPage={setStackPageRecord}
                      
                      />
                    </div>

                  </TabPanel>

                  <TabPanel>
                    <div className="overflow-y-auto">
                    
                    <TransactionFilter
                      setSearch={setRemoveStackSearchRecord}
                      search={removeStackSearch}
                    />
                      <NewTable 
                          data={removeStakeHistoryList}
                          columns={columns}
                          isLoader={loading}
                        />
                      <GlobalPagination
                        totalCount={removeStackTotalCount || 0}
                        dataCount={removeStackTotalCount || 0}
                        pageSize={perPage}
                        currentPage={removeStackPage-1}
                        gotoPage={setRemoveStackPageRecord}
                      
                      />
                    </div>

                  </TabPanel>
                 
                </Tabs>
              </div>
            </div>
          </div>
        );
      
      }

export default StakeHistory
