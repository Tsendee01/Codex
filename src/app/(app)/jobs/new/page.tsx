"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronLeft, Compass, FileText, MapPin, Sparkles } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { title: "Үндсэн мэдээлэл", icon: FileText },
  { title: "Байршил & Цаг", icon: MapPin },
  { title: "Шалгах", icon: Sparkles }
] as const;

export default function CreateJobPage() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  return (
    <section className="space-y-8 pb-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-display text-primary">Ажил үүсгэх</h1>
          <p className="text-body text-muted-foreground">3 алхмаар мэдээллээ баталгаажуулж шинэ ажил нийтлэх.</p>
        </div>
        <Badge variant="mint" className="w-max">Алхам {step + 1} / {steps.length}</Badge>
      </div>

      <Card className="bg-background/80">
        <CardHeader className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
              <span>Таны удирдах самбар</span>
            </div>
            <span className="text-body-sm text-muted-foreground">Дэвшил {progress}%</span>
          </div>
          <Stepper activeStep={step} />
        </CardHeader>
        <CardContent>
          <motion.div
            key={step}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6"
          >
            {step === 0 ? <StepOne /> : null}
            {step === 1 ? <StepTwo /> : null}
            {step === 2 ? <StepThree /> : null}
          </motion.div>
        </CardContent>
      </Card>

      <footer className="fixed bottom-6 left-1/2 z-20 w-[min(720px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-border/60 bg-background/90 p-4 shadow-card backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
            <Compass className="h-4 w-4" />
            <span>Алхам {step + 1} — {steps[step].title}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
              Буцах
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}>Дараах</Button>
            ) : (
              <Button>Нийтлэх</Button>
            )}
          </div>
        </div>
      </footer>
    </section>
  );
}

interface StepProps {
  title: string;
  description: string;
  children: ReactNode;
}

function StepCard({ title, description, children }: StepProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-border/50 bg-muted/30 p-6">
      <div className="space-y-2">
        <h2 className="text-heading-2 text-foreground">{title}</h2>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function StepOne() {
  return (
    <StepCard title="Үндсэн мэдээлэл" description="Ажлынхаа гол мэдээллийг бөглөнө үү.">
      <div className="md:col-span-2">
        <Input placeholder="Ажлын гарчиг" />
      </div>
      <Select>
        <SelectTrigger className="h-12 rounded-lg border-border/60 bg-background/80">
          <SelectValue placeholder="Ангилал сонгох" />
        </SelectTrigger>
        <SelectContent>
          {['Маркетинг', 'Техник', 'Үйл ажиллагаа', 'Хэл'].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Төсөв (₮)" />
      <div className="md:col-span-2">
        <Textarea rows={5} placeholder="Дэлгэрэнгүй тайлбар" className="min-h-[160px]" />
      </div>
    </StepCard>
  );
}

function StepTwo() {
  return (
    <StepCard title="Байршил & Цаг" description="Хаана, хэдийд хийхийг тодорхойлно уу.">
      <Input placeholder="Хаяг" />
      <Input placeholder="Дэлгэрэнгүй байршил" />
      <Input placeholder="Өргөрөг (lat)" />
      <Input placeholder="Уртраг (lng)" />
      <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
        <Input type="date" className="h-12" />
        <Input type="time" className="h-12" />
      </div>
      <div className="md:col-span-2 rounded-2xl border border-dashed border-border/50 bg-muted/30 p-5 text-body-sm text-muted-foreground">
        <Calendar className="mb-2 h-5 w-5 text-primary" />
        Ажлын хугацаа болон байршлыг тогтоосноор тохирох гүйцэтгэгчдийг санал болгоно.
      </div>
    </StepCard>
  );
}

function StepThree() {
  return (
    <StepCard title="Шалгах" description="Оруулах гэж буй мэдээллээ дахин нягтална уу.">
      <SummaryItem label="Ажлын гарчиг" value="Сошиал контент зураг авалт" />
      <SummaryItem label="Ангилал" value="Маркетинг" />
      <SummaryItem label="Төсөв" value="280,000₮" />
      <SummaryItem label="Байршил" value="Улаанбаатар, Сүхбаатар" />
      <SummaryItem label="Хугацаа" value="2024-11-12 10:00" />
      <div className="md:col-span-2 rounded-2xl bg-background/70 p-5 text-body-sm text-muted-foreground">
        Хяналтын дараа “Нийтлэх” товчийг дарж ажлаа идэвхжүүлнэ үү. Таны ажлыг баталгаажуулсны дараа тохирох гүйцэтгэгчдэд
        мэдэгдэнэ.
      </div>
    </StepCard>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/70 p-4">
      <p className="text-body-sm text-muted-foreground">{label}</p>
      <p className="text-body font-semibold text-foreground">{value}</p>
    </div>
  );
}

interface StepperProps {
  activeStep: number;
}

function Stepper({ activeStep }: StepperProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {steps.map((stepItem, index) => {
          const Icon = stepItem.icon;
          const isActive = index === activeStep;
          const isComplete = index < activeStep;

          return (
            <div key={stepItem.title} className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border text-primary transition-all duration-200 ease-premium ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : isComplete
                      ? "border-accent bg-accent/30"
                      : "border-border/60 bg-muted/40"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              {index < steps.length - 1 ? (
                <div className="hidden h-px w-16 bg-border/60 md:block" />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {steps.map((stepItem, index) => (
            <span
              key={stepItem.title}
              className={`rounded-full px-3 py-1 text-body-sm ${
                index === activeStep ? "bg-accent/40 text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {index + 1}. {stepItem.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
