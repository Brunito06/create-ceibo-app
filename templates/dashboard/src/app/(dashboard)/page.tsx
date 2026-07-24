import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { label: "Active users", value: "1,204" },
  { label: "MRR", value: "$8,420" },
  { label: "Churn", value: "1.2%" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Example page — replace these cards with real data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
