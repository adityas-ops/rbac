// components/common/Table.tsx
import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          {headers.map((header) => (
            <th key={header} className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase">
              {header}
            </th>
          ))}
          <th className="py-3 px-6"></th> {/* For actions */}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
