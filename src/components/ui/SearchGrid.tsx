import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './Button';

type TSearchGridProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearch: VoidFunction;
  handleClearSearch: VoidFunction;
  appliedSearchTerm: string;
};

export const SearchGrid = ({
  appliedSearchTerm,
  searchTerm,
  handleClearSearch,
  handleSearch,
  setSearchTerm,
}: TSearchGridProps) => {
  return (
    <div className="mb-4 flex items-center">
      <div className="relative flex-grow mr-2">
        <input
          type="text"
          placeholder="Buscar.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 items-end pr-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button onClick={handleSearch}>Buscar</Button>
      {appliedSearchTerm && (
        <Button
          variant="secondary"
          onClick={handleClearSearch}
          className="ml-2"
        >
          Limpiar
        </Button>
      )}
    </div>
  );
};
