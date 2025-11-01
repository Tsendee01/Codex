"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Paperclip, Search, Send } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const threads = [
  {
    id: "1",
    name: "Г.Цэнгүүн",
    role: "Гүйцэтгэгч",
    lastMessage: "Сүүлийн фото багц илгээгдлээ.",
    time: "Өнөөдөр 13:24",
    unread: 2
  },
  {
    id: "2",
    name: "А.Баярмаа",
    role: "Захиалагч",
    lastMessage: "Баярлалаа, баталгаажууллаа.",
    time: "Өчигдөр",
    unread: 0
  },
  {
    id: "3",
    name: "Team MN UI",
    role: "Систем",
    lastMessage: "Нэхэмжлэх шинэчлэгдлээ.",
    time: "2 өдрийн өмнө",
    unread: 0
  }
];

const messages = [
  { id: "m1", sender: "Та", content: "Сайн байна уу, зураг авалтын байршлыг баталгаажуулна уу?", time: "09:50" },
  { id: "m2", sender: "Г.Цэнгүүн", content: "Сайн байна уу! 11:00 цагт студид бэлэн байна.", time: "09:53" },
  { id: "m3", sender: "Та", content: "Гайхалтай, хэрэгцээт хэрэгслийг бэлдээрэй.", time: "09:55" },
  { id: "m4", sender: "Г.Цэнгүүн", content: "Мэдээж. Сүүлийн фото багц илгээгдлээ.", time: "13:24" }
];

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(threads[0].id);
  const reduceMotion = useReducedMotion();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-display text-primary">Мессеж</h1>
          <p className="text-body text-muted-foreground">Харилцаагаа нэг дороос удирдаж, санал солилцоогоо хурдлуул.</p>
        </div>
        <Badge variant="mint" className="w-max">
          <MessageCircle className="mr-2 h-4 w-4" /> 5 идэвхтэй чат
        </Badge>
      </div>

      <Card className="grid min-h-[520px] overflow-hidden rounded-2xl border border-border/60 bg-background/80 md:grid-cols-[320px_1fr]">
        <aside className="border-b border-border/60 md:border-b-0 md:border-r">
          <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Харилцагч хайх…" className="h-10 rounded-full border-none bg-muted/40" />
          </div>
          <div className="flex flex-col gap-1 p-2">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`group flex w-full flex-col gap-1 rounded-xl px-4 py-3 text-left transition-all duration-200 ease-premium ${
                  thread.id === activeThread
                    ? "bg-accent/30 text-foreground shadow-card"
                    : "text-muted-foreground hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-body font-semibold">{thread.name}</span>
                  <span className="text-body-sm text-muted-foreground">{thread.time}</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span>{thread.lastMessage}</span>
                  {thread.unread > 0 ? <Badge variant="mint">{thread.unread}</Badge> : null}
                </div>
              </button>
            ))}
          </div>
        </aside>
        <div className="relative flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-border/60 px-6 py-5">
            <div>
              <h2 className="text-heading-3 text-foreground">{threads.find((thread) => thread.id === activeThread)?.name}</h2>
              <p className="text-body-sm text-muted-foreground">Гүйцэтгэгч • Сүүлийн холболт 3 минутын өмнө</p>
            </div>
            <Button variant="outline" size="sm">
              Профайл харах
            </Button>
          </header>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={reduceMotion ? undefined : { opacity: 0.85, scale: 0.98 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                className={`max-w-[80%] rounded-2xl px-5 py-3 text-body shadow-card ${
                  message.sender === "Та"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground"
                }`}
              >
                <p>{message.content}</p>
                <span className="mt-2 block text-right text-body-sm text-muted-foreground/70">{message.time}</span>
              </motion.div>
            ))}
            <div className="text-center text-body-sm text-muted-foreground">Өнөөдөр</div>
          </div>
          <div className="sticky bottom-0 border-t border-border/60 bg-background/90 px-6 py-4">
            <div className="flex items-end gap-3">
              <Textarea rows={2} placeholder="Зурвас бичих…" className="min-h-[64px] flex-1" />
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-11 w-11 rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-right text-body-sm text-muted-foreground">Ctrl + Enter илгээх</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
