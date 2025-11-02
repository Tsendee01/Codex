"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { messages } from "@/lib/i18n";
import { dashboardOffers, dashboardRecentJobs, dashboardStats } from "@/mock/dashboard";

export default function DashboardPage() {
  const reduceMotion = useReducedMotion();
  const greeting = messages.mn.dashboard.welcome;

  return (
    <section className="space-y-10">
      <header className="grid gap-6 rounded-2xl bg-gradient-to-br from-muted/60 via-muted/30 to-transparent px-6 py-7 sm:grid-cols-[2fr_1fr] sm:items-center lg:px-9 lg:py-10">
        <div className="space-y-4">
          <Badge variant="mint" className="w-max">
            Тавтай морил
          </Badge>
          <h1 className="text-display-lg text-primary">Таны удирдах самбар</h1>
          <p className="max-w-2xl text-body text-muted-foreground">{greeting}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button>Ажил үүсгэх</Button>
            <Button variant="outline">Идэвхтэй ажлууд</Button>
          </div>
        </div>
        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle>Өнөөдрийн явц</CardTitle>
            <CardDescription>Сүүлийн шинэчлэлт 15 минутын өмнө.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-baseline justify-between text-heading-3">
              <span className="text-muted-foreground">Төлөвлөгдсөн</span>
              <span className="text-primary">8 ажил</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }} aria-hidden />
            </div>
            <p className="text-body-sm text-muted-foreground">
              3 ажилд санал хүлээгдэж байна. Хугацаанд нь багтаахын тулд саналыг баталгаажуулна уу.
            </p>
          </CardContent>
        </Card>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((card) => (
          <motion.div
            key={card.title}
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-heading-3">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-semibold text-foreground">{card.value}</span>
                  <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-accent-foreground">
                    {card.trend}
                  </span>
                </div>
                <div className="relative h-14 overflow-hidden rounded-xl bg-muted/50">
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.sparkline}`} aria-hidden />
                  <div
                    className="absolute bottom-0 left-0 h-full w-full bg-[linear-gradient(120deg,rgba(185,224,217,0.35)_20%,transparent_60%)] opacity-70 mix-blend-multiply"
                    aria-hidden
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Сүүлийн ажлууд</CardTitle>
              <CardDescription>Ажил бүрийн явцыг хялбархан хянаарай.</CardDescription>
            </div>
            <Button variant="ghost" className="text-body-sm text-primary">
              Бүгдийг харах
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardRecentJobs.length === 0 ? (
              <EmptyState message="Одоогоор мэдээлэл алга." description="Шинэ ажил үүсгэж эхлэх үү?" />
            ) : (
              dashboardRecentJobs.map((job) => (
                <div
                  key={job.id}
                  className="grid gap-2 rounded-xl border border-border/40 bg-background/60 px-4 py-3 transition-colors duration-200 ease-premium hover:border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-body font-semibold text-foreground">{job.title}</span>
                    <Badge variant="outline">{job.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-muted-foreground">
                    <span>{job.date}</span>
                    <span>{job.price}</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Шинэ саналууд</CardTitle>
              <CardDescription>Шинэ ирсэн саналуудаа хурдан баталгаажуул.</CardDescription>
            </div>
            <Button variant="ghost" className="text-body-sm text-primary">
              Санал удирдах
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardOffers.length === 0 ? (
              <EmptyState message="Одоогоор мэдээлэл алга." description="Ажлын санал ирэхийг түр хүлээнэ үү." />
            ) : (
              dashboardOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-background/60 px-4 py-3"
                >
                  <div>
                    <p className="text-body font-semibold text-foreground">{offer.name}</p>
                    <p className="text-body-sm text-muted-foreground">{offer.job}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-body font-semibold text-primary">{offer.price}</p>
                    <p className="text-body-sm text-muted-foreground">{offer.time}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="border-dashed border-border/50 bg-support/20">
          <CardHeader>
            <CardTitle>Төлөвлөлтийн зөвлөмж</CardTitle>
            <CardDescription>Таны ашиглаж буй мэдээлэл дээр үндэслэв.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl bg-background/70 p-5">
              <p className="text-body font-semibold text-foreground">Ээлжит ажлаа хуваарилах</p>
              <p className="text-body-sm text-muted-foreground">
                Ажил гүйцэтгэгчдийн хүртээмжийн мэдээлэл дээр үндэслэн Баасан гаригт өндөр эрэлттэй байх төлөвтэй байна.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl bg-background/70 p-5">
              <p className="text-body font-semibold text-foreground">Бюджетийн хяналт</p>
              <p className="text-body-sm text-muted-foreground">
                Зарцуулалт 65% хүрсэн байна. Үлдсэн санхүүгээ хуваарилахдаа нэн тэргүүний ажлуудад төвлөрөөрэй.
              </p>
              <Skeleton className="h-2 w-2/3 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

interface EmptyStateProps {
  message: string;
  description?: string;
}

function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-dashed border-border/50 bg-muted/30 p-6">
      <span className="text-body font-semibold text-muted-foreground">{message}</span>
      {description ? <span className="text-body-sm text-muted-foreground/80">{description}</span> : null}
    </div>
  );
}
