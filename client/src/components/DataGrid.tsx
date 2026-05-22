// ============================================================
// DataGrid - Cyberpunk styled data table
// ============================================================
import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataGridProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataGrid({ columns, data, onRowClick }: DataGridProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#00ff88]/10">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 text-[#556677] font-mono text-xs">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-[#00ff88]/5 hover:bg-[#00ff88]/5 transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3">
                  {col.render ? col.render(row[col.key], row) : (
                    <span className="text-white font-mono text-xs">{row[col.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[#556677] font-mono">No data available</p>
        </div>
      )}
    </div>
  );
}
