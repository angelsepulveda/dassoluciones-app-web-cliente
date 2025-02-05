import { Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';
import { NavigationMenu } from './NavigationMenu';
import SidebarLogo from './SIdebarLogo';

type TSIdebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({ open, setOpen }: TSIdebarProps) => {
  return (
    <div
      className={`${
        open ? 'translate-x-0' : '-translate-x-full'
      } fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-white dark:bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 shadow-lg`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center">
          <SidebarLogo />
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 lg:hidden"
        >
          <X size={24} />
        </button>
      </div>
      <NavigationMenu />
    </div>
  );
};
