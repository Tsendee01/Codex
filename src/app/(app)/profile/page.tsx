"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Edit, MapPin, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { messages } from "@/lib/i18n";
import { mockJobHistory, mockReviews, mockSkills } from "@/mock/profile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "reviews">("jobs");
  const [editOpen, setEditOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const appName = messages.mn.appName;

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-display text-primary">Профайл</h1>
          <p className="text-body text-muted-foreground">Таны захиалгын түүх, ур чадвар, үнэлгээг нэг дор төвлөрүүллээ.</p>
        </div>
        <Button variant="outline" onClick={() => setEditOpen(true)}>
          <Edit className="mr-2 h-4 w-4" /> Мэдээлэл засах
        </Button>
      </header>

      <Card className="overflow-hidden">
        <CardContent className="grid gap-6 p-0 md:grid-cols-[320px_1fr]">
          <div className="border-b border-border/60 bg-muted/20 p-6 md:border-b-0 md:border-r">
            <div className="flex flex-col items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-semibold text-primary">
                ЖТ
              </div>
              <div>
                <h2 className="text-heading-2 text-foreground">Ж.Тэмүүлэн</h2>
                <p className="text-body-sm text-muted-foreground">{appName} хэрэглэгч</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-body-sm text-accent-foreground">
                <Star className="h-4 w-4" /> 4.9 / 5
              </div>
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> Улаанбаатар, Монгол
              </div>
              <div className="flex flex-wrap gap-2">
                {mockSkills.map((skill) => (
                  <Badge key={skill} variant="mint" className="text-body-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 p-6">
            <div className="flex items-center gap-3 rounded-full border border-border/60 bg-muted/30 p-1">
              <Button
                variant={activeTab === "jobs" ? "default" : "ghost"}
                className="rounded-full px-4"
                onClick={() => setActiveTab("jobs")}
              >
                Миний ажлууд
              </Button>
              <Button
                variant={activeTab === "reviews" ? "default" : "ghost"}
                className="rounded-full px-4"
                onClick={() => setActiveTab("reviews")}
              >
                Үнэлгээ
              </Button>
            </div>
            <motion.div
              key={activeTab}
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {activeTab === "jobs"
                ? mockJobHistory.map((item) => (
                    <Card key={item.id} className="bg-background/70">
                      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-heading-3">{item.title}</CardTitle>
                          <CardDescription>{item.status}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-muted/40 px-3 py-1 text-body-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-primary" /> {item.rating}
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                : mockReviews.map((review) => (
                    <Card key={review.id} className="bg-background/70">
                      <CardHeader>
                        <CardTitle className="text-heading-3">{review.author}</CardTitle>
                        <CardDescription>{review.job}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="right" className="w-[min(28rem,90vw)] border-none p-0">
          <SheetHeader className="border-b border-border/60 px-6 py-5 text-left">
            <SheetTitle className="text-heading-3">Профайл засах</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-5 px-6 py-6">
            <div className="space-y-2">
              <label className="text-body-sm text-muted-foreground">Нэр</label>
              <Input defaultValue="Ж.Тэмүүлэн" />
            </div>
            <div className="space-y-2">
              <label className="text-body-sm text-muted-foreground">Танилцуулга</label>
              <Textarea rows={4} defaultValue="Контент бүтээх, маркетингийн чиглэлээр 5 жилийн туршлагатай." />
            </div>
            <div className="space-y-2">
              <label className="text-body-sm text-muted-foreground">Байршил</label>
              <Input defaultValue="Улаанбаатар" />
            </div>
            <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-5 text-body-sm text-muted-foreground">
              Ур чадваруудаа шинэчилснээр танд тохирох ажлын санал нэмэгдэнэ.
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Хадгалах</Button>
              <Button variant="outline" className="flex-1" onClick={() => setEditOpen(false)}>
                Болих
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
