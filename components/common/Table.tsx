import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="  p-3 overflow-x-auto w-full">
      <table className=" bg-white shadow-md w-full rounded-lg">
        <thead className="bg-blue-800 w-full rounded-lg">
          <tr className=''>
            {headers.map((header) => (
              <th key={header} className="py-3 px-6  text-left text-sm  text-white font-bold uppercase">
                {header}
              </th>
            ))}
            <th className="py-3 px-6"></th> {/* For actions */}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
