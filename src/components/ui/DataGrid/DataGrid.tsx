import { ChevronUp, ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';
import { NoDataMessage } from './NoDataMessage';

export type TColumn<T> = {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
};

type TDataGridProps<T> = {
  data: T[];
  columns: TColumn<T>[];
  sortField?: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: any) => void;
  actions?: (item: T) => ReactNode;
};

export function DataGrid<T>({
  data,
  columns,
  sortField,
  sortOrder,
  onSort,
  actions,
}: TDataGridProps<T>) {
  const renderSortIcon = (field: keyof T) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp size={18} />
    ) : (
      <ChevronDown size={18} />
    );
  };

  if (data.length === 0) {
    return <NoDataMessage />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort && onSort(column.key)}
              >
                <div className="flex items-center">
                  {column.header}
                  {renderSortIcon(column.key)}
                </div>
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200"
                >
                  {column.render
                    ? column.render(item)
                    : (item[column.key] as React.ReactNode)}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-sm">{actions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
