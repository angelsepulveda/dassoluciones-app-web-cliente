import { X } from 'lucide-react';

type TModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: TModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
