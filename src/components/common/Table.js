
import React from "react";
import { useTable, usePagination,useGlobalFilter,useFilters , useSortBy} from 'react-table'

import GlobalFilter from "./GlobalFilter";
import { GlobalPagination } from "./GlobalPagination";
// import ReactTooltip from "react-tooltip";


function Table({columns, data ,roles ,isRolesEnabled,perPage,tableType , isDashboard=false}) {


  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    gotoPage,
    siblingCount,
    setFilter,
    setGlobalFilter,
    state: { pageIndex 
          },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 , pageSize:perPage ,  sortBy: [{
        id: 'blockNumber',
        desc: true
     }], 
     hiddenColumns:["blockNumber"],
    },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
      )

  // const handleFilterChange = e => {
  //   const value = e.target.value || undefined;
  //   setGlobalFilter(value);
  //   // setFilter("contactNo", value);  
  // };

  let totalCount = rows.length
  let currentPage = Number(pageIndex);
  let dataCount = data.length;
  let customPagination =  <div className="grid md:grid-cols-3 gap-3 pb-3">
      <p className="text-sm font-normal p-4 text-slate-gray">
      No records found
      </p>  
  </div>
  
  // Render Data Table UI
  return (
    <>    
      { !isDashboard && <GlobalFilter
                preGlobalFilteredRows={data}
                setGlobalFilter={setGlobalFilter}
                setFilter={setFilter}
                roles={roles}
                isRolesEnabled={isRolesEnabled}
                tableType={tableType}
        />}
      <div className="overflow-y-auto">
       <table className="items-center bg-transparent w-full border-collapse"  {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {/* {headerGroup.headers.map(column => (
                <th className="px-4 py-2 h-10 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))} */}

                {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th  className="px-4 py-2 h-10 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
      
      
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td key={i} className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table> 
      </div>
      
      {/*custom pagination render start*/}
      {/* {customPagination} */}
      
          {!isDashboard && ((page.length===0)?
           customPagination:
      
          //  <div className="grid md:grid-cols-2 gap-3 pb-3">
          //  <p className="text-sm font-normal p-4 text-slate-gray">
          //  Showing {page.length} items out of {data.length} records
          //  </p>    
          <GlobalPagination
                        totalCount={totalCount} 
                        dataCount={dataCount}
                        pageSize={perPage}
                        siblingCount={siblingCount}
                        currentPage={currentPage}
                        gotoPage={gotoPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                    />
        //  </div>
         
          )}
        {/*custom pagination render end*/}

   
      
        
    </>


  )
}
export default Table;