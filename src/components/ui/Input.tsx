import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-2 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
