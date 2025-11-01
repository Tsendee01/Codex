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
import { useAuth } from "@/hooks/useAuth";
import { messages } from "@/lib/i18n";
import { normalizeError, sleep } from "@/lib/utils";

const signInSchema = z.object({
  email: z.string().min(1, "Имэйл шаардлагатай").email({ message: "Имэйл хаяг буруу байна" }),
  password: z.string().min(6, "Нууц үг дор хаяж 6 тэмдэгт байх ёстой")
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { login, setLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const handleSubmit = async (values: SignInValues) => {
    setSubmitting(true);
    setLoading(true);
    try {
      await sleep(1200);
      login({ user: { email: values.email }, token: "stub-token" });
      router.push("/");
    } catch (error) {
      const normalized = normalizeError(error);
      toast({
        title: "Алдаа",
        description: normalized.message ?? messages.mn.auth.error,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-background p-8 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">{messages.mn.auth.signIn}</h1>
          <p className="text-sm text-muted-foreground">
            Хувийн самбартаа нэвтрэхийн тулд бүртгэлээ ашиглана уу.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" data-testid="sign-in-form" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
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
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={submitting || !form.formState.isValid}>
              {submitting ? "Түр хүлээнэ үү…" : messages.mn.auth.signIn}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Шинэ хэрэглэгч үү?{" "}
          <Link className="font-medium text-primary" href="/auth/sign-up">
            {messages.mn.auth.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
