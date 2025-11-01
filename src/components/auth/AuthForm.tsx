"use client";

import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

interface AuthFormProps<TFieldValues extends FieldValues> {
  title: string;
  description?: string;
  submitLabel: string;
  loadingText?: string;
  form: UseFormReturn<TFieldValues>;
  onSubmit: (values: TFieldValues) => Promise<void> | void;
  isSubmitting: boolean;
  footer?: ReactNode;
  children: ReactNode;
}

export function AuthForm<TFieldValues extends FieldValues>({
  title,
  description,
  submitLabel,
  loadingText = "Түр хүлээнэ үү...",
  form,
  onSubmit,
  isSubmitting,
  footer,
  children
}: AuthFormProps<TFieldValues>) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <Form {...form}>
        <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">{children}</CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
                  {loadingText}
                </span>
              ) : (
                submitLabel
              )}
            </Button>
            {footer ? <div className="text-center text-sm text-muted-foreground">{footer}</div> : null}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
