import { Loader2 } from 'lucide-react';

type TLoadingStateProps = {
  message: string;
};

export const LoadingState = ({ message }: TLoadingStateProps) => (
  <div className="flex justify-center items-center py-8">
    <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
    <span className="ml-2 text-gray-600 dark:text-gray-400">{message}</span>
  </div>
);
