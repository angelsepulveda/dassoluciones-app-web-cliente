import { PrivateLayout } from '@/components/layouts/PrivateLayout/PrivateLayout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
