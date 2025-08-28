import React from "react";

interface TableColumn {
  key: string;
  title: string;
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  striped?: boolean;
}

export function Table({
  columns,
  data,
  className = "",
  striped = true,
}: TableProps) {
  return (
    <div className={`relative transform rotate-[0.2deg] ${className}`}>
      {/* Sketchy border layers */}
      <div className="absolute inset-0 border-2 border-black rounded-lg transform rotate-[-0.3deg] translate-x-[2px] translate-y-[2px]"></div>
      <div className="absolute inset-0 border-2 border-black rounded-lg transform rotate-[0.4deg]"></div>

      <div className="relative z-10 bg-white rounded-lg overflow-hidden border-2 border-black">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F8F8] border-b-2 border-black border-dashed">
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={`
                      px-4 py-3 text-left font-extrabold text-black
                      transform ${
                        index % 2 === 0 ? "rotate-[-0.2deg]" : "rotate-[0.3deg]"
                      }
                      relative
                    `}
                  >
                    {column.title}
                    {/* Hand-drawn underline */}
                    <span
                      className={`
                      absolute -bottom-1 left-2 right-2 h-[2px] bg-[#2E86AB]
                      transform ${
                        index % 2 === 0 ? "rotate-[0.5deg]" : "rotate-[-0.4deg]"
                      }
                    `}
                    ></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    border-b border-black border-dashed last:border-b-0
                    hover:bg-[#FEFEFE] transition-colors
                    ${
                      striped && rowIndex % 2 === 1
                        ? "bg-[#FAFAFA]"
                        : "bg-white"
                    }
                  `}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className={`
                        px-4 py-3 text-[#333]
                        transform ${
                          (rowIndex + colIndex) % 2 === 0
                            ? "rotate-[0.1deg]"
                            : "rotate-[-0.1deg]"
                        }
                      `}
                    >
                      {column.render
                        ? column.render(row[column.key], row, rowIndex)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
