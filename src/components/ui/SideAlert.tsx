'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

type TSideAlertProps = {
  message: string;
  type: 'success' | 'error';
  onClose: VoidFunction;
};

export const SideAlert = ({ message, type, onClose }: TSideAlertProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation before calling onClose
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

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
      className={`fixed top-4 right-4 w-80 ${bgColor} border-l-4 ${borderColor} p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-start">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-300 mt-0.5 mr-3" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400 dark:text-red-300 mt-0.5 mr-3" />
        )}
        <div className="flex-1">
          <p className={`${textColor} font-medium`}>{message}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className={`${textColor} hover:opacity-75 focus:outline-none`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
