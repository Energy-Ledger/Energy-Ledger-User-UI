import React, { useState } from "react";
// import { useTable, usePagination,useGlobalFilter,useFilters,useAsyncDebounce } from 'react-table'


function GlobalFilter({
    // preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    roles,
    isRolesEnabled,
    tableType
  })
{
    
  const [searchInput,handleGlobalFilter] = useState("");
  const [UserRole, setFilterUserRole] = useState("");
  const [type, setType] = useState("");

  const handleGlobalChange = event => {
    handleGlobalFilter(event.target.value);
    setGlobalFilter(event.target.value);
  };

  const handleFilterRole = e => {
    const value = e.target.value || undefined;
    setFilter("role", value);
    setFilterUserRole(value);
  };
  const handleFilterType = e => {
    const value = e.target.value || undefined;
    setFilter("type", value);
    setType(value);
  };
  const filterType = tableType
  let filter;
  if (filterType === 'user') {
    filter =  <div className="px-4 pb-3 flex items-center justify-end">
    <input
        name="searchInput"
        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 mr-3"
        value={searchInput || ""}
        onChange={handleGlobalChange}
        label="Search"
        placeholder={"Search by Batch Id"}
      />
     
     
        
      {isRolesEnabled === '1'? (
      <div className="relative">
      <select
        className="border text-coalblack bg-white sm:text-sm rounded-lg focus:shadow-sm block w-auto min-w-[150px] appearance-none p-3"
        value={UserRole}
        onChange={handleFilterRole}
       >
          
      <option value="">Select Role</option>
      {roles.map((e, key) => {
        return (
          <option key={key} value={key}>
            {e.toUpperCase()}
          </option>
        );
      })}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
      </div>
      ) : ('')}
      
    </div>
  
  }else if(filterType === 'batch')
  {
    filter =  <div className="px-4 pb-3 flex items-center justify-end">
    <input
        name="searchInput"
        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 mr-3"
        value={searchInput || ""}
        onChange={handleGlobalChange}
        label="Search"
        placeholder={"Search by batch id"}
      />
      </div>
    
  }
  else if(filterType === 'elxTable')
  {
    filter =  <div className="px-4 pb-3 flex items-center justify-end">
    <input
        name="searchInput"
        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 mr-3"
        value={searchInput || ""}
        onChange={handleGlobalChange}
        label="Search"
        placeholder={"Search..."}
      />
     
      <div className="relative">
      <select
        className="border text-coalblack bg-white sm:text-sm rounded-lg focus:shadow-sm block w-auto min-w-[150px] appearance-none p-3"
        value={type}
        onChange={handleFilterType}
       >
          
      <option value="">Select Type</option>
      <option key={"Received"} value={"Received"}>Received</option>
      <option key={"Sent"} value={"Sent"}>Sent</option>
     
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    </div>
    
  }
  else if(filterType === 'bnbTable')
  {
    filter =  <div className="px-4 pb-3 flex items-center justify-end">
    <input
        name="searchInput"
        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 mr-3"
        value={searchInput || ""}
        onChange={handleGlobalChange}
        label="Search"
        placeholder={"Search..."}
      /> 
    </div>
    
  }
  else {
    filter =  <div className="px-4 pb-3 flex items-center justify-end">
    <input
        name="searchInput"
        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 mr-3"
        value={searchInput || ""}
        onChange={handleGlobalChange}
        label="Search"
        placeholder={"Search..."}
      /> 
    </div>
    
  }
  return (
      <div>
        {filter}
      </div>
  )

}
    export default GlobalFilter