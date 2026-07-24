import { DashboardHeader } from "@/components/shared/dashboard-header";
import { DashboardSidebar } from "@/components/shared/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
