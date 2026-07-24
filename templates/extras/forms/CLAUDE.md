## Forms

- Form validation follows the react-hook-form + zod pattern in `src/components/shared/contact-form.tsx`: define a schema in `src/lib/validations/*.ts`, infer its type with `z.infer`, and wire it up with `useForm({ resolver: zodResolver(schema) })`.
- Reuse this pattern for any new form instead of hand-rolling validation — it keeps client-side validation and TypeScript types in sync from a single schema.
- `src/app/contact/page.tsx` is a working example with no backend wired up — replace the `console.log` in `onSubmit` with a Server Action or API call.
