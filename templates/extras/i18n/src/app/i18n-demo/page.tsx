import { getTranslations } from "next-intl/server";

import { switchLocaleAction } from "@/i18n/actions";
import { Button } from "@/components/ui/button";

export default async function I18nDemoPage() {
  const t = await getTranslations("i18nDemo");

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
      <form action={switchLocaleAction}>
        <Button type="submit" variant="outline">
          {t("switchTo")}
        </Button>
      </form>
    </main>
  );
}
