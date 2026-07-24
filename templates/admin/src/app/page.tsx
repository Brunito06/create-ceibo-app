import { CustomersTable } from "@/components/shared/customers-table";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
        <ThemeToggle />
      </div>
      <CustomersTable />
    </div>
  );
}
