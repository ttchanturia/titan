import type { ReactNode } from 'react';
import { AdminLoginGate } from '../components/AdminLoginGate';
import { AdminSidebar } from '../components/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminLoginGate>
      <main className="min-h-screen bg-surface px-8 py-16 max-w-screen-lg mx-auto flex gap-16">
        <AdminSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </main>
    </AdminLoginGate>
  );
}
