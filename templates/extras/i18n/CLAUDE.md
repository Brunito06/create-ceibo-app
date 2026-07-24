## i18n

- Locale is stored in a `locale` cookie (not a `[locale]` URL segment) — this keeps every other template's route layout untouched. Available locales: `src/i18n/request.ts`'s `LOCALES` (`en`, `es` by default).
- Messages live in `src/messages/{locale}.json`, loaded per-request in `src/i18n/request.ts`.
- **Server Components**: call `getTranslations("namespace")` from `next-intl/server` directly, as `src/app/i18n-demo/page.tsx` does — no provider needed.
- **Client Components**: `useTranslations` requires wrapping the specific subtree in `NextIntlClientProvider` yourself (pass it the messages for that namespace) — this extra doesn't wrap the root layout in one, so it composes cleanly with other extras that also touch `src/app/layout.tsx` (pwa, analytics). If you need client-side translations app-wide, wrap `{children}` in `NextIntlClientProvider` inside `src/app/layout.tsx` by hand.
- ICU MessageFormat is used for interpolation (`{variable}`) — to output a literal brace, wrap it in single quotes (see the demo messages for an example).
