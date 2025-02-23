import { Button } from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TPaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (value: number) => void;
};

export const PaginationButtons = ({
  currentPage,
  totalPages,
  goToPage,
}: TPaginationButtonsProps) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </Button>
      {renderPaginationButtons()}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};
