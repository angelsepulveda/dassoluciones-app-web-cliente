'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TSubItem } from './menuItem.d';

type TMenuItemProps = {
  icon: any;
  title: string;
  subItems?: TSubItem[];
};

export const MenuItem = ({
  icon: Icon,
  title,
  subItems = [],
}: TMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <button
        className="flex items-center w-full py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 rounded-md"
        onClick={toggleOpen}
      >
        <Icon className="mr-2" size={18} />
        <span className="flex-grow text-left">{title}</span>
        {subItems.length > 0 && (
          <ChevronDown
            className={`ml-auto transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            size={18}
          />
        )}
      </button>
      {subItems.length > 0 && (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? `${menuRef.current?.scrollHeight}px` : '0',
          }}
          ref={menuRef}
        >
          <div className="pl-4 mt-2">
            {subItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <span className="flex items-center py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 rounded-md">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
