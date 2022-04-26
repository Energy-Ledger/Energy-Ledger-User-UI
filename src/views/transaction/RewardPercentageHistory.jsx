import React, { useState, useEffect } from 'react';
import alertService from "../../services/alert.service"
import { useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TransactionFilter from '../../components/common/TransactionFilter';

import configService from '../../services/config.service';

import apiService from '../../services/api.service';
import NewTable from '../../components/common/NewTable';
import { GlobalPagination } from '../../components/common/GlobalPagination';
import * as momemt from 'moment';


    const RewardPercentageHistory =  () => {
        const {user } = useSelector(state => state.auth);

        const [loading, setLoading] = useState(false);
        const [totalCount, setTotalCount] = useState(0);
        const [page, setPage] = useState(1);
        const [perPage] = useState(10);

        const [rewardPercentHistoryList, setRewardPercentHistoryList] = useState([]);

        const bscUrl = configService.blockchainExpEndpointUrl();
        const [search, setSearch] = useState("");

        const setPageRecord=(value)=>{
          setPage(Number(value)+1)
        }

        const setSearchRecord=(search)=>{
          setSearch(search)
          setPage(1)
        }
        
        const rewardPercentUpdateHistory = async () => {
          try {
            setLoading(true);
            let _response = await apiService.getPercentageHistory(
              page,
              perPage,
              search
            );

            if(_response.status === "failure"){
              alertService.showError(_response.message);
            setLoading(false);

            }
            setTotalCount(_response.pagination.totalCount)
            let _txns = [..._response.records];
            for(let _txn of _txns){
              _txn["transactionHash"] = _txn.transaction_hash
              _txn["rewardPercentage"] = _txn.reward_percetage
              _txn["timestamp"] = momemt.unix(_txn.update_date).format("lll");
                  
            }
            
            setRewardPercentHistoryList(_txns);

            setLoading(false);
          } catch (error) {
            alertService.showError(error.message);
          }
        };
            
      
        useEffect(() => {
          (async () => {
              await rewardPercentUpdateHistory()
                  
          })();
        },[page, search]);

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
          { accessor: "rewardPercentage", Header: "REWARD PERCENT (%)" },  
      
        ];
      
        return (
          <div>
            <div className="content text-coalblack">
              {loading === true ? <Spinner /> : ""}
      
              {/* table */}
              <div className="bg-white rounded-xl border shadow-sm">
                <Tabs>
                  <TabList>
                  <Tab>Reward Percentage History</Tab>
                  </TabList>
      
                  <TabPanel>
                    <div className="overflow-y-auto">
                      <TransactionFilter
                        setSearch={setSearchRecord}
                        search={search}
                        />
                      <NewTable 
                          data={rewardPercentHistoryList}
                          columns={columns}
                          isLoader={loading}
                        />
                      <GlobalPagination
                        totalCount={totalCount || 0}
                        dataCount={totalCount || 0}
                        pageSize={perPage}
                        currentPage={page-1}
                        gotoPage={setPageRecord}
                      
                      />
                    </div>

                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        );
      
      }

export default RewardPercentageHistory
