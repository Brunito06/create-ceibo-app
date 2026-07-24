export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "active" | "trialing" | "churned";
  mrr: number;
}

export const CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com",
    plan: "Enterprise",
    status: "active",
    mrr: 499,
  },
  {
    id: "2",
    name: "Grace Hopper",
    email: "grace@example.com",
    plan: "Pro",
    status: "active",
    mrr: 49,
  },
  {
    id: "3",
    name: "Alan Turing",
    email: "alan@example.com",
    plan: "Pro",
    status: "trialing",
    mrr: 0,
  },
  {
    id: "4",
    name: "Katherine Johnson",
    email: "katherine@example.com",
    plan: "Free",
    status: "active",
    mrr: 0,
  },
  {
    id: "5",
    name: "Margaret Hamilton",
    email: "margaret@example.com",
    plan: "Enterprise",
    status: "churned",
    mrr: 0,
  },
  {
    id: "6",
    name: "Radia Perlman",
    email: "radia@example.com",
    plan: "Pro",
    status: "active",
    mrr: 49,
  },
];
