import React from "react";
// import { useTable, usePagination,useGlobalFilter,useFilters,useAsyncDebounce } from 'react-table'


function TransactionFilter({
    // preGlobalFilteredRows,
    setSearch, 
    search, 
    isRolesEnabled=null,
    userRole=null,
    handleFilterRole=null
  })
{

  let filter;

    filter =  <div className="px-4 pb-3 flex items-center justify-end">
    <input
        name="searchInput"
        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 mr-3"
        value={search || ""}
        onChange={(e) => setSearch(e.target.value)}
        label="Search"
        placeholder={"Search By Transaction or Amount"}
      />
      {isRolesEnabled === '1'? (
      <div className="relative">
      <select
        className="border text-coalblack bg-white sm:text-sm rounded-lg focus:shadow-sm block w-auto min-w-[150px] appearance-none p-3"
        value={userRole}
        onChange={handleFilterRole}
       >
          
      <option value="">Select Role</option>
      <option value="sent">Sent</option>
      <option value="received">Received</option>
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
      </div>
      ) : ('')}
      </div>
    
  


  
  return (
      <div>
        {filter}
      </div>
  )

}
    export default TransactionFilter