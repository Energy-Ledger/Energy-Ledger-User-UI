import React from 'react';


const Users = () => {
    return (
        <div className="">
            <div className="content text-coalblack">
            

                <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 mt-8">
                    <div className="bg-white rounded-xl  shadow-sm lg:col-span-8">
                       {/* table */}
                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="flex justify-between w-full pt-3">
                        <h2 className="ml-3 text-sm font-semibold relative top-3">Users</h2>
                        <button type="button" className="mb-3 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg transform transition-transform mx-3 flex">
                        <img src="./images/plus.svg" alt="" />
                        <span className="ml-2 text-xs font-semibold">Add New User</span>
                        </button>
                    </div>
                    <table className="items-center bg-transparent w-full border-collapse  ">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            User name
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            User contact
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            user role
                            </th>

                            <th className="px-4 py-2 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            action
                            </th>
                        </tr>

                        
                        </thead>

                        <tbody>
                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className="inline-flex">
                                    <div className="h-10 w-10 min-w-[40px] rounded-full overflow-hidden">
                                        <img className="w-full h-full object-cover" src="./images/profile.svg" alt="" />
                                    </div>
                                    <div className="ml-2">
                            <h4 className="text-sm font-semibold text-coalblack">Theresa Webb</h4>
                            <p className="text-slate-gray text-xxs font-normal truncate ">12dRugNcdxK39288NjcDV4G9288NjcD</p>
                            </div>
                            </div>
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code">
                            +1(404) 789 9403
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg transform transition-transform flex">
                           Operator
                            </button>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border mr-4">
                                    <img src="./images/edit.svg" alt="" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="./images/delete.svg" alt="" />
                            </a>
                            </td>
                           
                                                      
                        </tr>
                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className="inline-flex">
                                    <div className="h-10 w-10 min-w-[40px] rounded-full overflow-hidden">
                                        <img className="w-full h-full object-cover" src="./images/profile.svg" alt="" />
                                    </div>
                                    <div className="ml-2">
                            <h4 className="text-sm font-semibold text-coalblack">Theresa Webb</h4>
                            <p className="text-slate-gray text-xxs font-normal truncate ">12dRugNcdxK39288NjcDV4G9288NjcD</p>
                            </div>
                            </div>
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code">
                            +1(404) 789 9403
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg transform transition-transform flex">
                           Operator
                            </button>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border mr-4">
                                    <img src="./images/edit.svg" alt="" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="./images/delete.svg" alt="" />
                            </a>
                            </td>                         
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className="inline-flex">
                                    <div className="h-10 w-10 min-w-[40px] rounded-full overflow-hidden">
                                        <img className="w-full h-full object-cover" src="./images/profile.svg" alt="" />
                                    </div>
                                    <div className="ml-2">
                            <h4 className="text-sm font-semibold text-coalblack">Theresa Webb</h4>
                            <p className="text-slate-gray text-xxs font-normal truncate ">12dRugNcdxK39288NjcDV4G9288NjcD</p>
                            </div>
                            </div>
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code">
                            +1(404) 789 9403
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-red rounded-md text-white outline-none shadow-lg flex">
                            Auditor
                            </button>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border mr-4">
                                    <img src="./images/edit.svg" alt="" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="./images/delete.svg" alt="" />
                            </a>
                            </td>                           
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className="inline-flex">
                                    <div className="h-10 w-10 min-w-[40px] rounded-full overflow-hidden">
                                        <img className="w-full h-full object-cover" src="./images/profile.svg" alt="" />
                                    </div>
                                    <div className="ml-2">
                            <h4 className="text-sm font-semibold text-coalblack">Theresa Webb</h4>
                            <p className="text-slate-gray text-xxs font-normal truncate ">12dRugNcdxK39288NjcDV4G9288NjcD</p>
                            </div>
                            </div>
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code">
                            +1(404) 789 9403
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-yellow rounded-md text-white outline-none shadow-lg flex">
                            Exporter
                            </button>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border mr-4">
                                    <img src="./images/edit.svg" alt="" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="./images/delete.svg" alt="" />
                            </a>
                            </td>                        
                        </tr>

                        <tr className="border-b">
                            <th className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className="inline-flex">
                                    <div className="h-10 w-10 min-w-[40px] rounded-full overflow-hidden">
                                        <img className="w-full h-full object-cover" src="./images/profile.svg" alt="" />
                                    </div>
                                    <div className="ml-2">
                            <h4 className="text-sm font-semibold text-coalblack">Theresa Webb</h4>
                            <p className="text-slate-gray text-xxs font-normal truncate ">12dRugNcdxK39288NjcDV4G9288NjcD</p>
                            </div>
                            </div>
                            </th>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code">
                            +1(404) 789 9403
                            </td>
                            <td className="border-t-0 px-4 py-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-green rounded-md text-white outline-none shadow-lg flex">
                            Importer
                            </button>
                            </td>
                            <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border mr-4">
                                    <img src="./images/edit.svg" alt="" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border view-icn">
                                    <img src="./images/delete.svg" alt="" />
                            </a>
                            </td>                         
                        </tr>
                        </tbody>
                    </table>
                    <p className="text-sm font-normal p-4 text-slate-gray">Showing 10 items out of 250 results found</p>
                </div>
                    </div>
                    <div className="bg-white rounded-xl border shadow-sm px-4 py-2 lg:col-span-4">    
                        <div className="flex justify-between border-b p-4">
                        <h2 className="text-sm font-semibold">User Roles</h2>
                        <h2 className="text-sm font-semibold">Role Slug</h2>
                        </div>
                        <div className="flex justify-between border-b p-4">
                            <p className="text-sm font-normal">Operator</p>
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-green rounded-md text-white outline-none shadow-lg transform flex">
                            Importer
                            </button>
                        </div>

                        <div className="flex justify-between border-b p-4">
                            <p className="text-sm font-normal">Auditor</p>
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-green rounded-md text-white outline-none shadow-lg  flex">
                            Importer
                            </button>
                        </div>

                        <div className="flex justify-between border-b p-4">
                            <p className="text-sm font-normal">Exporter</p>
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-green rounded-md text-white outline-none shadow-lg  flex">
                            Importer
                            </button>
                        </div>

                        <div className="flex justify-between border-b p-4">
                            <p className="text-sm font-normal">Importer</p>
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-green rounded-md text-white outline-none shadow-lg flex">
                            Importer
                            </button>
                        </div>

                        <div className="flex justify-between p-4">
                            <p className="text-sm font-normal">Refinery</p>
                            <button type="button" className="text-xs font-medium px-6 py-2 bg-dark-green rounded-md text-white outline-none shadow-lg flex">
                            Importer
                            </button>
                        </div>
                    <div>
            </div>
                    </div>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-8">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                    <img className="mb-4" src="./images/qr-code.png" alt=""/>
                    <h3 className="text-md font-semibold">Your Address</h3>
                    <p className="text-sm font-normal text-slate-gray break-words">12dRugNcdxK39288NjcDV4G12dRugNcdx</p>
                    <div className="flex float-right mt-2">
                    <a className="text-xxs text-indigo-500 mr-1" href="">Copy Address</a>
                    <img src="./images/copy-link.svg" alt="" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-4">
                    <img className="mb-4" src="./images/qr-code.png" alt=""/>
                    <h3 className="text-md font-semibold">Your Address</h3>
                    <p className="text-sm font-normal text-slate-gray break-words">12dRugNcdxK39288NjcDV4G12dRugNcdx</p>
                    <div className="flex float-right mt-2">
                    <a className="text-xxs text-indigo-500 mr-1" href="">Copy Address</a>
                    <img src="./images/copy-link.svg" alt="" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-4">
                    <img className="mb-4" src="./images/qr-code.png" alt=""/>
                    <h3 className="text-md font-semibold">Your Address</h3>
                    <p className="text-sm font-normal text-slate-gray break-words">12dRugNcdxK39288NjcDV4G12dRugNcdx</p>
                    <div className="flex float-right mt-2">
                    <a className="text-xxs text-indigo-500 mr-1" href="">Copy Address</a>
                    <img src="./images/copy-link.svg" alt="" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-4">
                    <img className="mb-4" src="./images/qr-code.png" alt=""/>
                    <h3 className="text-md font-semibold">Your Address</h3>
                    <p className="text-sm font-normal text-slate-gray break-words">12dRugNcdxK39288NjcDV4G12dRugNcdx</p>
                    <div className="flex float-right mt-2">
                    <a className="text-xxs text-indigo-500 mr-1" href="">Copy Address</a>
                    <img src="./images/copy-link.svg" alt="" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Users