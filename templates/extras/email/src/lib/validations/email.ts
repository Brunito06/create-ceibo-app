import { z } from "zod";

export const emailFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;
