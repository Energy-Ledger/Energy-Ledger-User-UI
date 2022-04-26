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


    const RewardHistory =  () => {
        const {user } = useSelector(state => state.auth);

        const [loading, setLoading] = useState(false);
      
        const [perPage] = useState(10);
        const [totalCount, setTotalCount] = useState('');

        const [rewardDistHistoryList, setRewardDistHistoryList] = useState([]);
        const [search, setSearch] = useState("");
       
        const [refreshBatchList, setRefreshBatchList] = useState(true);  // console.log(user.wallet_address);
        
        const bscUrl = configService.blockchainExpEndpointUrl();
        
        const [page, setPage] = useState(1);

        const setPageRecord=(value)=>{
          // alert(value)
          setPage(Number(value)+1)
          setRefreshBatchList(true)
        }

        const setSearchRecord=(search)=>{
          setSearch(search)
          setPage(1)
          setRefreshBatchList(true)
        }


          useEffect(() => {
            // setTimeout(()=>{
        
              const getRecords = async () => {
                setLoading(true);
            
                try {
                  if(refreshBatchList){
                    setRewardDistHistoryList([]);
                    let rec = await apiService.getRewardHistory(page ,  perPage , user.wallet_address, search);
                   
        
                    setRewardDistHistoryList(rec.data.records)
                    setTotalCount(rec.data.pagination.totalCount)

                    setRefreshBatchList(false)
        
                    
                  }
                  setLoading(false);
                  
                } catch (error) {
                  setLoading(false);
                  alertService.showError(error.message);
                }
              };
        
            (async () => {
              await  getRecords();
        
              })();
            // }, 1)
            
        
          }, [user.wallet_address , refreshBatchList]);


        
     

            
    

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
          { accessor: "reward_date", Header: "Date",  Cell: ({ row }) => (
            <>
             {momemt.unix(row.original.reward_date).format("lll")}
            </>
          ), },
          { accessor: "wallet_address", Header: "Account" },
          
          {
            accessor: "reward_amount",
            id:"reward_amount",
            Header: "Reward (ELX)",
            Cell: ({ row }) => (
              <>
              {Number(row.original.reward_amount)|| ""}
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
                    <Tab>Reward Distribution History</Tab>
                  </TabList>
      
                  <TabPanel>
                    <div className="overflow-y-auto">
                    <TransactionFilter
                      setSearch={setSearchRecord}
                      search={search}
                      />
                  <NewTable 
                      data={rewardDistHistoryList}
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

export default RewardHistory
