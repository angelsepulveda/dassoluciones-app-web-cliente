import { PrivateLayout } from '@/components';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
