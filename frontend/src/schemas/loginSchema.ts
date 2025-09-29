import { z } from "zod";

export const loginSchema = z.object({
  admin: z.boolean().optional().default(false),

  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(15, { message: "Username must be at most 15 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/, {
      message: "Username must contain letters and numbers only",
    }),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&%$#@<>?=():;*!+])[A-Za-z\d&%$#@<>?=():;*!+]+$/,
      {
        message: "Password must include uppercase, lowercase, number, and special character",
      }
    ),
})