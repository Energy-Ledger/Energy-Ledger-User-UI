import React, { useState, useEffect } from 'react';
import elxService from "../../services/elx.service"
import alertService from "../../services/alert.service"
import userService from "../../services/user.service"
import { useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Table from "../../components/common/Table"
import axios from 'axios';
import configService from '../../services/config.service';


const TransactionHistory = () => {
    const { user } = useSelector(state => state.auth);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bscUrl, setBscUrl] = useState("");
    const [bnbRecords, setBNBRecords] = useState([]);

    useEffect(() => {
        (async () => {


            const getTransaction = async (_walletAddress) => {
                try {
                    setLoading(true);

                    let history = await elxService.transactionHistory(_walletAddress);
                    let bnbHistory = await elxService.bnbTransactionHistory(_walletAddress);
                    var blockchainExpEndpoint = configService.blockchainExpEndpointUrl();
                    // console.log("history" , history);
                    // console.log("bnbHistory" , bnbHistory);
                    setBscUrl(blockchainExpEndpoint)
                    if (history) {

                        setRecords(history)
                    }
                    if (bnbHistory) {

                        setBNBRecords(bnbHistory)
                    }
                    setLoading(false);

                } catch (error) {
                    setLoading(false);

                    alertService.showError(error.message);
                }
            };
            await getTransaction(user.wallet_address);
        })();
    }, [user.wallet_address]);



    const elxColumns = [
        {
            accessor: 'transaction',
            disableSortBy: true,
            Header: 'Transaction Id', Cell: ({ row }) => (

                <>
                    <a href={bscUrl + 'tx/' + row.original.transaction} target="_blank">{row.original.transaction}</a>
                </>
            )
        },

        // {
        //     accessor: 'block_number',
        //     disableSortBy: true,
        //     Header: 'Block Number', Cell: ({ row }) => (

        //         <>
        //             {row.original.block_number || 'N/A'}
        //         </>
        //     )
        // },

        {
            accessor: "created_date",
            Header: "date",
            disableSortBy: true,
            Cell: ({ row }) => (
                <>
                    {row.original.created_date || 'N/A'}
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
                <>
                    {row.original.type || 'N/A'}
                </>
            ),
        },
    ];

    const bnbColumns = [
        { accessor: 'transaction',
        disableSortBy:true, 
        Header: 'Transaction Id' ,  Cell:({row})=>(
        
          <>
                    <a href={bscUrl + 'tx/' + row.original.transaction} target="_blank">{row.original.transaction}</a>
          </>
        )  },

        // { 
        // accessor: 'block_number',
        // disableSortBy:true, 
        // Header: 'Block Number' ,  Cell:({row})=>(
         
        //   <>
        //     {row.original.block_number || 'N/A'}        
        //   </>
        // )  },
  
        {
          accessor: "created_date",
          Header: "date",
          disableSortBy:true,
          Cell: ({ row }) => (
            <>
            {row.original.created_date || 'N/A'}   
            </>
          ),
        },
        
        
        {
            accessor: "gasUsed",
            Header: "Gas Used (BNB)",
            disableSortBy:true,
            Cell: ({ row }) => (
              <>
              {row.original.gasUsed || 'N/A'}   
              </>
            ),
        },
    ]


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
                            <Tab>BSC Transactions History</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>
                                {loading === true ? <Spinner /> : ""}
                                <Table data={records} columns={elxColumns} roles={[]} isRolesEnabled={0} perPage={10} tableType={"elxTable"} isDashboard={false} />

                                {/* <Table data={elxTxList} columns={elxColumns} roles={null} isRolesEnabled={null} perPage={4} tableType={elxTable} sortField={sortField} onPage={onPage}/> */}

                            </h2>
                        </TabPanel>
                        <TabPanel>
                            {loading === true ? <Spinner /> : ""}
                            {/* <Table data={bnbTxList} columns={bnbColumns} roles={null} isRolesEnabled={null} perPage={4} tableType={bnbTable} sortField={sortField} onPage={onPage}/> */}
                            <Table data={bnbRecords} columns={bnbColumns} roles={[]} isRolesEnabled={0} perPage={10} tableType={"bnbTable"} isDashboard={false} />

                        </TabPanel>
                    </Tabs>

                    {/* {records &&
                        <Table data={records} columns={columns} roles={[]} isRolesEnabled={0} perPage={3} tableType={"user"} isDashboard={false}/>
                    } */}
                    {/* <table className="items-center bg-transparent w-full border-collapse  ">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Transaction ID
                                </th>

                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Date
                                </th>

                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Username
                                </th>

                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Stacked amount
                                </th>

                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Reward percentage
                                </th>

                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Reward amount
                                </th>

                                <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                   <span>123</span>
                                </th>
                                <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span>24-11-2021</span>
                                </td>
                                <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span>John</span>
                                </td>
                                <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span>0.001</span>
                                </td>
                                <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span>2</span>
                                </td>
                                <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                   <span>0.2444</span>
                                </td>
                                <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <Link to="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                        <img src="../../images/eye.svg" alt="" />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-sm font-normal p-4 text-slate-gray">Showing 10 items out of 250 results found</p> */}
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory
