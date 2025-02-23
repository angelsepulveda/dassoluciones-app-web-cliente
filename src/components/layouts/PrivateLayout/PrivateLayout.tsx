'use client';

import { ThemeProvider } from '@/themes/ThemeProvider';
import { ReactNode, useState } from 'react';
import { Sidebar } from './partials/Sidebar/Sidebar';
import { TopBar } from './partials/Topbar/Topbar';

type TPrivateLayoutProps = {
  children: ReactNode;
};

export const PrivateLayout = ({ children }: TPrivateLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};
