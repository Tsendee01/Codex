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
import { useAuth } from "@/hooks/useAuth";
import { login } from "@/lib/auth";
import { normalizeAxiosError } from "@/lib/errors";
import { signInSchema, type SignInValues } from "@/lib/validation";

export default function SignInPage() {
  const { setToken, setUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = async (values: SignInValues) => {
    try {
      const response = await login(values);
      setToken(response.access_token);
      setUser(response.user);
      toast({ description: "Амжилттай нэвтэрлээ." });
      router.replace("/");
    } catch (error) {
      const normalized = normalizeAxiosError(error);

      if (normalized.status === 400 && normalized.fieldErrors) {
        Object.entries(normalized.fieldErrors).forEach(([key, value]) => {
          const message = Array.isArray(value) ? value.join(" ") : value;
          if (message) {
            form.setError(key as keyof SignInValues, { type: "server", message: String(message) });
          }
        });
        return;
      }

      if (normalized.isNetworkError) {
        toast({ description: "Сүлжээний алдаа. Дахин оролдоно уу.", variant: "destructive" });
        return;
      }

      toast({ description: "Нэвтрэхэд алдаа гарлаа. Та мэдээллээ шалгана уу.", variant: "destructive" });
    }
  };

  return (
    <AuthForm
      description="Хувийн самбартаа нэвтрэхийн тулд бүртгэлээ ашиглана уу."
      footer={
        <>
          Шинэ хэрэглэгч үү?{' '}
          <Link className="font-medium text-primary" href="/auth/sign-up">
            Бүртгүүлэх
          </Link>
        </>
      }
      form={form}
      isSubmitting={form.formState.isSubmitting}
      loadingText="Нэвтэрч байна..."
      onSubmit={handleSubmit}
      submitLabel="Нэвтрэх"
      title="Нэвтрэх"
    >
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
              <PasswordInput autoComplete="current-password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </AuthForm>
  );
}
