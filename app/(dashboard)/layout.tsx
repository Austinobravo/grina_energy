import { Sidebar } from '@/components/shared/sidebar';
import { DashboardHeader } from '@/components/shared/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-accent/10">
          {children}
        </main>
      </div>
    </div>
  );
}
