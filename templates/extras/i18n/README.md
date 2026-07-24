## i18n

[next-intl](https://next-intl.dev) is wired up with a cookie-based locale (no `/en`/`/es` URL prefixes):

- Visit `/i18n-demo` to see it in action, with a button that switches between English and Spanish.
- Add translations in `src/messages/en.json` / `src/messages/es.json`; add a locale by adding it to `LOCALES` in `src/i18n/request.ts` and a matching messages file.
