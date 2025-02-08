import { X } from 'lucide-react';

type TAlertProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export default function Alert({ message, type, onClose }: TAlertProps) {
  const bgColor =
    type === 'success'
      ? 'bg-green-100 dark:bg-green-800'
      : 'bg-red-100 dark:bg-red-800';
  const textColor =
    type === 'success'
      ? 'text-green-800 dark:text-green-100'
      : 'text-red-800 dark:text-red-100';
  const borderColor =
    type === 'success'
      ? 'border-green-400 dark:border-green-600'
      : 'border-red-400 dark:border-red-600';

  return (
    <div
      className={`${bgColor} ${borderColor} border-l-4 p-4 mb-4 rounded-r-lg`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className={`${textColor} font-medium`}>{message}</p>
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-75 focus:outline-none`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
