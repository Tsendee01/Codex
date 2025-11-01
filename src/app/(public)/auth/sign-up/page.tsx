"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { messages } from "@/lib/i18n";
import { normalizeError, sleep } from "@/lib/utils";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Нэрийг гүйцэд оруулна уу"),
    email: z.string().min(1, "Имэйл шаардлагатай").email({ message: "Имэйл хаяг буруу байна" }),
    password: z.string().min(8, "Нууц үг дор хаяж 8 тэмдэгт байх ёстой"),
    confirmPassword: z.string().min(1, "Нууц үгээ дахин оруулна уу")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"]
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });

  const handleSubmit = async (values: SignUpValues) => {
    setSubmitting(true);
    try {
      await sleep(1400);
      toast({
        title: "Амжилттай",
        description: `${values.name}, бүртгэл амжилттай үүслээ. Одоо нэвтэрнэ үү.`,
        duration: 4000
      });
      router.push("/auth/sign-in");
    } catch (error) {
      const normalized = normalizeError(error);
      toast({
        title: "Алдаа",
        description: normalized.message ?? messages.mn.auth.error,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-background p-8 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">{messages.mn.auth.signUp}</h1>
          <p className="text-sm text-muted-foreground">
            Нэг удаагийн ажлын сүлжээнд шинэ боломжуудыг нээнэ үү.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{messages.mn.auth.name}</FormLabel>
                  <FormControl>
                    <Input placeholder="Батболд" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{messages.mn.auth.email}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{messages.mn.auth.password}</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{messages.mn.auth.confirmPassword}</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={submitting || !form.formState.isValid}>
              {submitting ? "Түр хүлээнэ үү…" : messages.mn.auth.signUp}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Аль хэдийн бүртгэлтэй юу?{" "}
          <Link className="font-medium text-primary" href="/auth/sign-in">
            {messages.mn.auth.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
