'use client';

import { Bell, LogOut, Menu, User } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

type TTopbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const TopBar = ({ sidebarOpen, setSidebarOpen }: TTopbarProps) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center">
        <ThemeToggle />
        <button className="flex mx-4 text-gray-600 dark:text-gray-300 focus:outline-none">
          <Bell size={24} />
        </button>
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
          >
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
              alt="Your avatar"
            />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                <User size={18} className="inline mr-2" />
                Perfil
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                <LogOut size={18} className="inline mr-2" />
                Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
