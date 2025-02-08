import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function SidebarLogo() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'dark' ? '/logoblanco.png' : '/logo.png'}
      alt="Dashboard Logo"
      width={150}
      height={32}
      priority
    />
  );
}
