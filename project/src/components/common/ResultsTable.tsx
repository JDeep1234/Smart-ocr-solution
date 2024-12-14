import React from 'react';

interface ResultRow {
  label: string;
  value: string | number;
}

interface ResultsTableProps {
  title: string;
  rows: ResultRow[];
}

export function ResultsTable({ title, rows }: ResultsTableProps) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left border">Property</th>
            <th className="px-4 py-2 text-left border">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{row.label}</td>
              <td className="px-4 py-2 border">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}