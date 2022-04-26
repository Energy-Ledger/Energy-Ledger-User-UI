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

const TransactionHistory = () => {
    const { user } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);

    const [elxTotalCount, setElxTotalCount] = useState(0);
    const [elxPage, setElxPage] = useState(1);
    const [perPage] = useState(5);

    const [elxList, setElxList] = useState([]);
    const [elxSearch, setElxSearch] = useState("");

    const [userRole, setUserRole] = useState("");

    const bscUrl = configService.getBlockchainExplorerEndpoint();

    const setElxPageRecord=(value)=>{
        setElxPage(Number(value)+1)
    }

    const handleFilterRole=(e)=>{
        setUserRole(e.target.value)
        setElxPage(1)
      }

    const setSearchRecord=(search)=>{
        setElxSearch(search)
        setElxPage(1)
      }
    
    const elxHistory = async () => {
        try {
        setLoading(true);
        let _response = await apiService.getElxHistory(
            elxPage,
            perPage,
            user.wallet_address,
            elxSearch,
            userRole
        );

        if(_response.status === "failure"){
            alertService.showError(_response.message);
        setLoading(false);

        }
        setElxTotalCount(_response.pagination.totalCount)
        let _txns = [..._response.records];
        for(let _txn of _txns){
            _txn["transactionHash"] = _txn.transaction_hash
            _txn["value"] = _txn.amount
            _txn["timestamp"] = momemt.unix(_txn.update_date).format("lll");

            if(user.wallet_address === _txn.from_address){
                _txn["type"] = 'Sent'
            }
            else if(user.wallet_address === _txn.to_address){
                _txn["type"] = 'Received'
            }
                
        }
        
        setElxList(_txns);

        setLoading(false);
        } catch (error) {
        alertService.showError(error.message);
        }
    };
        
    
    useEffect(() => {
        (async () => {
            await elxHistory()
                
        })();
    },[elxPage, elxSearch, userRole]);



    const elxColumns = [
        {
            accessor: 'transactionHash',
            disableSortBy: true,
            Header: 'Transaction Id', Cell: ({ row }) => (

                <>
                    <a href={bscUrl + 'tx/' + row.original.transactionHash} target="_blank">{row.original.transactionHash}</a>
                </>
            )
        },
        {
            accessor: "created_date",
            Header: "date",
            disableSortBy: true,
            Cell: ({ row }) => (
                <>
                    {row.original.timestamp || 'N/A'}
                </>
            ),
        },

        {
            accessor: "value",
            Header: "value (ELX)",
            disableSortBy: true,
            Cell: ({ row }) => (
                <>
                    {row.original.value || 'N/A'}
                </>
            ),
        },

        {
            accessor: "type",
            Header: "type",
            disableSortBy: true,
            Cell: ({ row }) => (
                <div
                className={
                    row.original.type === "Received"
                    ? "inline-flex text-dark-green"
                    : row.original.type === "Sent"
                    ? "inline-flex text-dark-red"
                    : ""
                }
                >
                    {row.original.type || 'N/A'}
                </div>
            ),
        },
    ];


    return (
        <div>
            <div className="content text-coalblack">
                {loading && <Spinner />}


                {/* table */}
                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="flex justify-between w-full py-3 items-center">
                        <h2 className="ml-3 text-sm font-semibold relative">Transactions history</h2>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>ELX Transactions History</Tab>
                            <Tab>BNB Transactions History</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>
                                {loading === true ? <Spinner /> : ""}
                                {/* <Table data={records} columns={elxColumns} roles={[]} isRolesEnabled={0} perPage={10} tableType={"elxTable"} isDashboard={false} /> */}
                                <TransactionFilter
                                    setSearch={setSearchRecord}
                                    search={elxSearch}
                                    isRolesEnabled='1'
                                    userRole={userRole}
                                    handleFilterRole={handleFilterRole}
                                />
                                <NewTable 
                                    data={elxList}
                                    columns={elxColumns}
                                    isLoader={loading}
                                    />
                                <GlobalPagination
                                    totalCount={elxTotalCount || 0}
                                    dataCount={elxTotalCount || 0}
                                    pageSize={perPage}
                                    currentPage={elxPage-1}
                                    gotoPage={setElxPageRecord}
                                
                                />

                            </h2>
                        </TabPanel>
                        <TabPanel>
                            
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory
