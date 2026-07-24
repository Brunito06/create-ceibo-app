"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { CUSTOMERS, type Customer } from "@/lib/customers";
import { cn } from "@/lib/utils";

type SortKey = "name" | "mrr";

const STATUS_STYLES: Record<Customer["status"], string> = {
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  trialing: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  churned: "bg-red-500/15 text-red-600 dark:text-red-400",
};

export function CustomersTable() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = CUSTOMERS.filter(
      (customer) =>
        needle.length === 0 ||
        customer.name.toLowerCase().includes(needle) ||
        customer.email.toLowerCase().includes(needle),
    );

    return [...filtered].sort((a, b) => {
      const result = sortKey === "name" ? a.name.localeCompare(b.name) : a.mrr - b.mrr;
      return sortAsc ? result : -result;
    });
  }, [query, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name or email..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="cursor-pointer px-4 py-3 font-medium" onClick={() => toggleSort("name")}>
                Customer {sortKey === "name" ? (sortAsc ? "↑" : "↓") : ""}
              </th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th
                className="cursor-pointer px-4 py-3 text-right font-medium"
                onClick={() => toggleSort("mrr")}
              >
                MRR {sortKey === "mrr" ? (sortAsc ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((customer) => (
              <tr key={customer.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-muted-foreground text-xs">{customer.email}</div>
                </td>
                <td className="px-4 py-3">{customer.plan}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      STATUS_STYLES[customer.status],
                    )}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">${customer.mrr}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-muted-foreground px-4 py-8 text-center">
                  No customers match &quot;{query}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
