import { z } from "zod"

export const registerSchema = z.object({
    admin: z.boolean(),
    username: z.regex(/^[a-zA-Z0-9]{3,15}$/),
    password: z.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&%$#@<>?=+]).{8,16}$/),
    confirmPassword: z.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&%$#@<>?=+]).{8,16}$/),
}).refine(data => data.password === data.confirmPassword, {
    path: ["passowrd"],
    error: "Passwords doesn't match"
})