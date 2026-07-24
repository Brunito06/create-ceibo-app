import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Cta() {
  return (
    <section id="cta" className="mx-auto max-w-3xl px-6 py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Ready to build?</CardTitle>
          <CardDescription>
            Swap this call-to-action for your actual signup, waitlist or contact form.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg">Get started</Button>
        </CardContent>
      </Card>
    </section>
  );
}
