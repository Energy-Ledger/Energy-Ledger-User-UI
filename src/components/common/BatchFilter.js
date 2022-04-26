import React from "react";
// import { useTable, usePagination,useGlobalFilter,useFilters,useAsyncDebounce } from 'react-table'


function BatchFilter({
    // preGlobalFilteredRows,
    setSearch, 
    search, 
  
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
        placeholder={"Search by batch id"}
      />
      </div>
    
  


  
  return (
      <div>
        {filter}
      </div>
  )

}
    export default BatchFilter