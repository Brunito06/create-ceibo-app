"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DEFAULT_LOCALE, LOCALES, type Locale } from "./request";

export async function switchLocaleAction(): Promise<void> {
  const cookieStore = await cookies();
  const current = (cookieStore.get("locale")?.value as Locale | undefined) ?? DEFAULT_LOCALE;
  const currentIndex = LOCALES.indexOf(current);
  const next = LOCALES[(currentIndex + 1) % LOCALES.length]!;

  cookieStore.set("locale", next);
  redirect("/i18n-demo");
}
