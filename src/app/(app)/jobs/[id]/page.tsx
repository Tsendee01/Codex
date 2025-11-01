"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Check, ChevronLeft, Clock, MapPin, MoreHorizontal, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const offers = [
  {
    id: "1",
    name: "Ц.Эрдэнэ",
    rating: 4.7,
    price: "230,000₮",
    eta: "24 цаг",
    status: "pending"
  },
  {
    id: "2",
    name: "Б.Номин",
    rating: 4.9,
    price: "260,000₮",
    eta: "18 цаг",
    status: "pending"
  },
  {
    id: "3",
    name: "С.Хүрэл",
    rating: 4.5,
    price: "210,000₮",
    eta: "36 цаг",
    status: "accepted"
  }
] as const;

const gallery = ["/images/placeholder-1.jpg", "/images/placeholder-2.jpg", "/images/placeholder-3.jpg"];

export default function JobDetailPage() {
  const reduceMotion = useReducedMotion();
  const [activeStatus, setActiveStatus] = useState<"all" | "pending" | "accepted">("all");

  const filteredOffers = offers.filter((offer) => (activeStatus === "all" ? true : offer.status === activeStatus));

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-primary">
            <ChevronLeft className="h-4 w-4" /> Буцах
          </Link>
          <span>Ажил №2451</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Зар засах</Button>
          <Button>Ажил хаах</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-3 pb-0">
          <Badge variant="mint" className="w-max">Маркетинг</Badge>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-display text-primary">Сошиал контент зураг авалт</CardTitle>
              <CardDescription>Богино хугацаанд брэндийн зураг авалтын тусламж хэрэгтэй.</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-primary">280,000₮</p>
              <p className="text-body-sm text-muted-foreground">Нийт төсөв</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-body-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" /> 2024.11.12 10:00
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Улаанбаатар, Сүхбаатар
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 1 өдөр үргэлжилнэ
            </span>
            <StatusPill status="Нээлттэй" tone="success" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-3">
              <h2 className="text-heading-2">Тайлбар</h2>
              <p className="text-body text-muted-foreground">
                Брэндийн шинэ бүтээгдэхүүний сурталчилгаанд зориулж контент зураг авалт хийх шаардлагатай. Профессион гэрэл зурагчин болон туслах баг
                хамтран ажиллана. Бэлтгэл ажлын жагсаалтыг ажлын өмнөх өдөр хүргэх болно.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-heading-2">Хаяг & Байршил</h2>
              <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <span className="text-body text-foreground">Ulaanbaatar photo studio, Seoul street 45</span>
                <div className="aspect-[16/9] w-full rounded-xl bg-[radial-gradient(circle_at_top,rgba(185,224,217,0.5),transparent_55%),rgba(51,65,85,0.1)]" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-heading-2">Галерей</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, index) => (
                  <motion.div
                    key={image}
                    initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                    className="aspect-[4/3] rounded-2xl border border-border/40 bg-muted/40"
                  />
                ))}
              </div>
            </div>
          </div>
          <aside className="space-y-5">
            <Card className="bg-background/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-heading-3">Ажлын захиалагч</CardTitle>
                <CardDescription>Баталгаажсан хэрэглэгч</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                    ЖТ
                  </div>
                  <div>
                    <p className="text-body font-semibold text-foreground">Ж.Тэмүүлэн</p>
                    <p className="text-body-sm text-muted-foreground">13 ажил нийтэлсэн</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" /> Холбогдох
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-background/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-heading-3">Ажлын явц</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-body-sm text-muted-foreground">
                <p>• Хийх ажлын жагсаалт илгээгдсэн</p>
                <p>• Багийн гишүүд баталгаажуулсан</p>
                <p>• Байршлын зөвшөөрөл баталгаажсан</p>
              </CardContent>
            </Card>
          </aside>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Саналын самбар</CardTitle>
            <CardDescription>Ирсэн саналуудыг харьцуулж шийдвэрлэнэ үү.</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 p-1">
            {[
              { value: "all", label: "Бүгд" },
              { value: "pending", label: "Шинэ" },
              { value: "accepted", label: "Зөвшөөрсөн" }
            ].map((item) => (
              <Button
                key={item.value}
                variant={activeStatus === item.value ? "default" : "ghost"}
                className="rounded-full px-4 py-2 text-body-sm"
                onClick={() => setActiveStatus(item.value as typeof activeStatus)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/50 bg-muted/30 p-6 text-body text-muted-foreground">
              Одоогоор мэдээлэл алга.
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-background/80">
                  <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {offer.name.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-body font-semibold text-foreground">{offer.name}</p>
                        <p className="text-body-sm text-muted-foreground">Үнэлгээ {offer.rating.toFixed(1)}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-right text-body-sm">
                      <div className="rounded-full bg-muted/40 px-4 py-1 text-muted-foreground">{offer.eta}</div>
                      <span className="text-2xl font-semibold text-primary">{offer.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className="gap-2 text-success-foreground">
                        <Check className="h-4 w-4" /> Зөвшөөрөх
                      </Button>
                      <Button variant="ghost" className="gap-2 text-destructive">
                        <X className="h-4 w-4" /> Татгалзах
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </CardContent>
        <CardFooter className="justify-between text-body-sm text-muted-foreground">
          <span>3 санал ирсэн</span>
          <Button variant="ghost" className="text-primary">
            Бүх саналууд
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

interface StatusPillProps {
  status: string;
  tone: "success" | "warning" | "danger";
}

function StatusPill({ status, tone }: StatusPillProps) {
  const toneClasses: Record<StatusPillProps["tone"], string> = {
    success: "bg-accent/30 text-accent-foreground",
    warning: "bg-warning/20 text-warning-foreground",
    danger: "bg-destructive/20 text-destructive-foreground"
  };

  return <span className={`rounded-full px-4 py-1 text-body-sm font-medium ${toneClasses[tone]}`}>{status}</span>;
}
