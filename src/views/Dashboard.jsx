import React from 'react';


const Dashboard = () => {
    return (
        <div className="">
            <div className="content text-coalblack">
                {/* cards */}
                <div className="mb-8">
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <div className="w-12 h-12 rounded-full bg-pestel-pink inline-flex justify-center items-center float-right text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h6 className="text-sm">Total Users</h6>
                        <h2 className="text-xl font-semibold my-1">34</h2>
                        <p className="text-xs text-light-coalblack mt-2">Lorem Ipsum is simply dummy text of the printing </p>
                    </div>
                
                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <div className="w-12 h-12 rounded-full bg-regular-blue inline-flex justify-center items-center float-right text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h6 className="text-sm">Total Roless</h6>
                        <h2 className="text-xl font-semibold my-1">5</h2>
                        <p className="text-xs text-light-coalblack mt-2">Lorem Ipsum is simply dummy text of the printing </p>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <div className="w-12 h-12 rounded-full bg-grinish-blue inline-flex justify-center items-center float-right text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h6 className="text-sm">Total Batches</h6>
                        <h2 className="text-xl font-semibold my-1">21</h2>
                        <p className="text-xs text-light-coalblack mt-2">Lorem Ipsum is simply dummy text of the printing </p>
                    </div>
                </div>
                </div>
                {/* table */}
                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="flex justify-between w-full py-3 items-center">
                        <h2 className="ml-3 text-sm font-semibold relative">Batches Overview</h2>
                        <button type="button" className=" px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg transform transition-transform mx-3 flex">
                        <img src="../images/plus.svg" alt="" />
                        <span className="ml-2 text-xs font-semibold">Create Batch</span>
                        </button>
                    </div>
                    <table className="items-center bg-transparent w-full border-collapse  ">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            qr code
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Batch ID
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Operator
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            auditor
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            exporter
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            importer
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            refinery
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            action
                            </th>
                        </tr>

                        
                        </thead>

                        <tbody>
                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate lg:max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate  max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-red">
                                <img className="mr-1" src="../images/cross.svg" alt="" />Not Available
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate  max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-yellow">
                                <img className="mr-1" src="../images/processing.svg" alt="" />Processing
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate  max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-yellow">
                                <img className="mr-1" src="../images/processing.svg" alt="" />Processing
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate  max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-yellow">
                                <img className="mr-1" src="../images/processing.svg" alt="" />Processing
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate  max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-yellow">
                                <img className="mr-1" src="../images/processing.svg" alt="" />Processing
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <img src="../images/qr-code.png" alt="" />
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-sm font-normal whitespace-nowrap p-4 truncate  max-w-xs trans-code">
                            12dRugNcdxK39288NjcDV4G
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="inline-flex text-dark-green">
                            <img className="mr-1" src="../images/tick.svg" alt="" />
                           Completed
                            </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-green">
                                <img className="mr-1" src="../images/tick.svg" alt="" />Completed
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="inline-flex text-dark-yellow">
                                <img className="mr-1" src="../images/processing.svg" alt="" />Processing
                                </div>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <a href="#"  className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="../images/eye.svg" alt="" />
                                
                                </a>
                            </td>                          
                        </tr>
                        </tbody>
                    </table>
                    <p className="text-sm font-normal p-4 text-slate-gray">Showing 10 items out of 250 results found</p>
                </div>

                <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 mt-8">
                    <div className="bg-white rounded-xl border shadow-sm p-6 lg:col-span-8">
                    <h2 className="mb-3 text-sm font-semibold">Statistics</h2>
                    </div>
                    <div className="bg-white rounded-xl border shadow-sm p-6 lg:col-span-4">
                    <h2 className="mb-3 text-sm font-semibold">Addresses</h2>
                    {/* address card */}
                    <div className="bg-white rounded-xl border shadow-sm p-3 mb-4">
                        <div className="inline-flex">
                            <img src="../images/qr-code.png" alt="" />
                            <p className="ml-3 text-sm font-semibold w-64">Your Address</p>
                        </div>
                        <div className="bg-white rounded-md border shadow-sm p-3 inline-flex w-full relative">
                            <p className="text-xs font-normal text-slate-gray">12dRugNcdxK39288NjcsK8NjCGn</p>
                            <img  className="absolute right-2" src="../images/copy.svg" alt="" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-3 mb-4">
                        <div className="inline-flex">
                            <img src="../images/qr-code.png" alt="" />
                            <p className="ml-3 text-sm font-semibold truncate w-64">Energy Supplichain Contract Add Energy Supplichain Contract Add</p>
                        </div>
                        <div className="bg-white rounded-md border shadow-sm p-3 inline-flex w-full relative">
                            <p className="text-xs font-normal text-slate-gray">12dRugNcdxK39288NjcsK8NjCGn</p>
                            <img  className="absolute right-2" src="../images/copy.svg" alt="" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-3 mb-4">
                        <div className="inline-flex">
                            <img src="../images/qr-code.png" alt="" />
                            <p className="ml-3 text-sm font-semibold w-64">Storage Contract Address</p>
                        </div>
                        <div className="bg-white rounded-md border shadow-sm p-3 inline-flex w-full relative">
                            <p className="text-xs font-normal text-slate-gray">12dRugNcdxK39288NjcsK8NjCGn</p>
                            <img  className="absolute right-2" src="../images/copy.svg" alt="" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-3 mb-4">
                        <div className="inline-flex">
                            <img src="../images/qr-code.png" alt="" />
                            <p className="ml-3 text-sm font-semibold w-64">User Contract Address</p>
                        </div>
                        <div className="bg-white rounded-md border shadow-sm p-3 inline-flex w-full relative">
                            <p className="text-xs font-normal text-slate-gray">12dRugNcdxK39288NjcsK8NjCGn</p>
                            <img  className="absolute right-2" src="./images/copy.svg" alt="" />
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard