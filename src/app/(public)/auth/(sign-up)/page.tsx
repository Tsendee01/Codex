"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { AuthForm } from "@/components/auth/AuthForm";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useToast } from "@/components/ui/use-toast";
import { register as registerUser } from "@/lib/auth";
import { normalizeAxiosError } from "@/lib/errors";
import { signUpSchema, type SignUpValues } from "@/lib/validation";

export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const handleSubmit = async (values: SignUpValues) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password
      });
      toast({ description: "Бүртгэл амжилттай. Та нэвтэрч орно уу." });
      router.replace("/auth/sign-in");
    } catch (error) {
      const normalized = normalizeAxiosError(error);

      if (normalized.status === 400 && normalized.fieldErrors) {
        Object.entries(normalized.fieldErrors).forEach(([key, value]) => {
          const message = Array.isArray(value) ? value.join(" ") : value;
          if (message) {
            form.setError(key as keyof SignUpValues, { type: "server", message: String(message) });
          }
        });
        return;
      }

      if (normalized.isNetworkError) {
        toast({ description: "Сүлжээний алдаа. Дахин оролдоно уу.", variant: "destructive" });
        return;
      }

      toast({ description: normalized.message ?? "Алдаа гарлаа", variant: "destructive" });
    }
  };

  return (
    <AuthForm
      description="Шинэ хэрэглэгчийн бүртгэлийн маягтыг бөглөнө үү."
      footer={
        <>
          Already have an account?{' '}
          <Link className="font-medium text-primary" href="/auth/sign-in">
            Нэвтрэх
          </Link>
        </>
      }
      form={form}
      isSubmitting={form.formState.isSubmitting}
      loadingText="Бүртгүүлж байна..."
      onSubmit={handleSubmit}
      submitLabel="Бүртгүүлэх"
      title="Бүртгүүлэх"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Нэр</FormLabel>
            <FormControl>
              <Input autoComplete="name" {...field} />
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
            <FormLabel>Имэйл</FormLabel>
            <FormControl>
              <Input autoComplete="email" placeholder="name@example.com" type="email" {...field} />
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
            <FormLabel>Нууц үг</FormLabel>
            <FormControl>
              <PasswordInput autoComplete="new-password" {...field} />
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
            <FormLabel>Нууц үгээ баталгаажуулах</FormLabel>
            <FormControl>
              <PasswordInput autoComplete="new-password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </AuthForm>
  );
}
