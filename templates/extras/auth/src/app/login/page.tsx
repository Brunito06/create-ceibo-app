import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/supabase/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Welcome back to __APP_TITLE__.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            {message && <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p>}
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <span className="text-muted-foreground">Don&apos;t have an account?&nbsp;</span>
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
