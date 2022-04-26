import React from 'react';
import { useTable } from 'react-table'



function NewTable({columns, data , isLoader=false}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: data,
  });
  let customPagination = <div className="grid md:grid-cols-3 gap-3 pb-3">
  <p className="text-sm font-normal p-4 text-slate-gray">
  {isLoader === true ? "Loading .." : "No records found"}
    </p>
</div>
  // Render Data Table UI
  return (
    <>
       <table className="items-center bg-transparent w-full border-collapse  "  {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="px-4 py-2 h-10 bg-gray-50 text-slate-gray align-middle border text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className="border-t-0 px-4 py-2 align-middle border-l-0 border-r-0 text-xs font-normal whitespace-nowrap p-4 truncate max-w-xs trans-code" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table> 
      {(rows.length == 0) &&
        customPagination}
   
      
      </>
  )
      
}
export default NewTable;