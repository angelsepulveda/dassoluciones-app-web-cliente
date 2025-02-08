import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  isDeleting: boolean;
  confirmText: string;
  cancelText: string;
  text: string;
};

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isDeleting,
  confirmText,
  cancelText,
  text,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-yellow-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {text}
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
