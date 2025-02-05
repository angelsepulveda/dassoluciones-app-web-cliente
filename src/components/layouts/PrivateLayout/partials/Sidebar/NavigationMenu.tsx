import { Home, WalletCards } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { MembershipsItems } from './menuItems';

export const NavigationMenu = () => {
  return (
    <nav className="mt-5 px-2">
      <MenuItem icon={Home} title="Inicio" />
      <MenuItem
        icon={WalletCards}
        title="Membresías"
        subItems={MembershipsItems}
      />
    </nav>
  );
};
