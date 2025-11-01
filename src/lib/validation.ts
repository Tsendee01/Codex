import { z } from "zod";

const emailSchema = z
  .string({ required_error: "Имэйл шаардлагатай." })
  .min(1, "Имэйл шаардлагатай.")
  .email("Имэйл хаяг буруу байна.");

const passwordSchema = z
  .string({ required_error: "Нууц үг шаардлагатай." })
  .min(6, "Нууц үг дор хаяж 6 тэмдэгт байх ёстой.");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "Нэр шаардлагатай." })
      .min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой.")
      .max(64, "Нэр хамгийн ихдээ 64 тэмдэгт байх ёстой."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string({ required_error: "Нууц үгээ дахин оруулна уу." })
      .min(6, "Нууц үг дор хаяж 6 тэмдэгт байх ёстой.")
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Нууц үгүүд таарахгүй байна.",
    path: ["confirmPassword"]
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
