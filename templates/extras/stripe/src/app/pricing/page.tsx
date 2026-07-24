import { createCheckoutSession } from "@/lib/stripe/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>__APP_TITLE__ Pro</CardTitle>
          <CardDescription>
            Set the price and what&apos;s included in the Stripe dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Checkout is powered by a single Stripe Price — set{" "}
            <code>STRIPE_PRICE_ID</code> in <code>.env.local</code>.
          </p>
        </CardContent>
        <CardFooter>
          <form action={createCheckoutSession} className="w-full">
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
