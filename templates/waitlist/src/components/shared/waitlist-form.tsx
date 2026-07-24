"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist, type WaitlistState } from "@/lib/waitlist-actions";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  return (
    <div className="w-full max-w-sm">
      <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
        <Input type="email" name="email" placeholder="you@example.com" required className="flex-1" />
        <Button type="submit" disabled={pending}>
          {pending ? "Joining..." : "Join waitlist"}
        </Button>
      </form>
      {state.message && (
        <p
          className={`mt-2 text-sm ${state.status === "error" ? "text-destructive" : "text-muted-foreground"}`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
