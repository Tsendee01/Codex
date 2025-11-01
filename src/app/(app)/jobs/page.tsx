"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Filter, MapPin, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Job {
  id: string;
  title: string;
  category: string;
  price: string;
  distance: string;
  rating: number;
  status: "Шинэ" | "Яаралтай" | "Хугацаа дууссан";
}

const JOBS: Job[] = [
  {
    id: "1",
    title: "Зураг авалтын туслах",
    category: "Маркетинг",
    price: "250,000₮",
    distance: "3км",
    rating: 4.9,
    status: "Шинэ"
  },
  {
    id: "2",
    title: "Хурлын тэмдэглэл бичигч",
    category: "Админ",
    price: "120,000₮",
    distance: "Офис дээр",
    rating: 4.5,
    status: "Яаралтай"
  },
  {
    id: "3",
    title: "Гэрийн цахилгаан засвар",
    category: "Техник",
    price: "180,000₮",
    distance: "8км",
    rating: 4.7,
    status: "Шинэ"
  },
  {
    id: "4",
    title: "Сошиал контент зохиогч",
    category: "Маркетинг",
    price: "320,000₮",
    distance: "Алсын",
    rating: 4.8,
    status: "Шинэ"
  },
  {
    id: "5",
    title: "Орчуулгын ажил (EN→MN)",
    category: "Хэл", 
    price: "210,000₮",
    distance: "Онлайн",
    rating: 4.6,
    status: "Шинэ"
  },
  {
    id: "6",
    title: "Ивент зохион байгуулах туслах",
    category: "Үйл ажиллагаа",
    price: "280,000₮",
    distance: "5км",
    rating: 4.4,
    status: "Яаралтай"
  }
];

const categories = ["Бүгд", "Маркетинг", "Админ", "Техник", "Хэл", "Үйл ажиллагаа"] as const;

export default function JobsPage() {
  const reduceMotion = useReducedMotion();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<typeof categories[number]>("Бүгд");
  const [radius, setRadius] = useState("10");
  const [budget, setBudget] = useState("Бүгд");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilters = useMemo(() => {
    const filters: Array<{ label: string; onReset: () => void }> = [];
    if (category !== "Бүгд") {
      filters.push({ label: `Ангилал: ${category}`, onReset: () => setCategory("Бүгд") });
    }
    if (budget !== "Бүгд") {
      filters.push({ label: `Төсөв: ${budget}`, onReset: () => setBudget("Бүгд") });
    }
    if (radius !== "10") {
      filters.push({ label: `Радиус: ${radius}км`, onReset: () => setRadius("10") });
    }
    return filters;
  }, [category, budget, radius]);

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "Бүгд" || job.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-display text-primary">Ажил хайх</h1>
          <p className="max-w-2xl text-body text-muted-foreground">
            Шүүлтүүрээ тохируулж ойролцоох эсвэл тохирсон ажлуудыг илүү хурдан олоорой.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="lg:hidden">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Шүүлтүүр
          </Button>
          <Button>Ажил үүсгэх</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="hidden flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-background/70 px-5 py-4 lg:flex">
          <div className="flex w-full max-w-sm items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ажил хайх…"
              className="h-11 rounded-full bg-muted/40"
            />
          </div>
          <div className="flex items-center gap-3">
            <Select value={category} onValueChange={(value) => setCategory(value as (typeof categories)[number])}>
              <SelectTrigger className="h-11 min-w-[160px] rounded-full border-border/50 bg-background/90">
                <SelectValue placeholder="Ангилал" />
              </SelectTrigger>
              <SelectContent align="end">
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="h-11 min-w-[140px] rounded-full border-border/50 bg-background/90">
                <SelectValue placeholder="Төсөв" />
              </SelectTrigger>
              <SelectContent align="end">
                {['Бүгд', '150к хүртэл', '150к-300к', '300к+'].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 text-body-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden />
            <label className="flex flex-col gap-1">
              <span>Хайх радиус</span>
              <input
                type="range"
                min="1"
                max="25"
                value={radius}
                onChange={(event) => setRadius(event.target.value)}
                className="h-1 w-40 cursor-pointer appearance-none rounded-full bg-muted"
              />
            </label>
            <span className="font-medium text-foreground">{radius}км</span>
          </div>
        </div>

        {activeFilters.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <Button
                key={filter.label}
                variant="ghost"
                className="rounded-full border border-border/60 bg-muted/40 text-body-sm text-muted-foreground"
                onClick={filter.onReset}
              >
                {filter.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="text-body-sm text-primary"
              onClick={() => {
                setCategory("Бүгд");
                setBudget("Бүгд");
                setRadius("10");
              }}
            >
              Цэвэрлэх
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-5 py-3 text-body-sm text-muted-foreground">
        <span>Нийт {filteredJobs.length} ажил олдлоо</span>
        <Button variant="ghost" size="sm" className="hidden text-primary lg:inline-flex" onClick={() => setIsFilterOpen(true)}>
          Шүүлтүүр
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={reduceMotion ? undefined : { opacity: 0.85, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-heading-3">{job.title}</CardTitle>
                  <Badge variant={job.status === "Яаралтай" ? "mint" : "secondary"}>{job.status}</Badge>
                </div>
                <CardDescription>{job.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-semibold text-primary">{job.price}</span>
                  <span className="text-body-sm text-muted-foreground">{job.distance}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/30 px-4 py-2 text-body-sm">
                  <span>Үнэлгээ</span>
                  <span className="font-semibold text-foreground">{job.rating.toFixed(1)} / 5</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="flex-1">Үзэх</Button>
                  <Button variant="outline" className="flex-1">
                    Санал илгээх
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-muted/40 py-12 text-center">
          <CardHeader>
            <CardTitle>Одоогоор мэдээлэл алга.</CardTitle>
            <CardDescription>Шүүлтүүрээ өөрчлөх эсвэл хайлтын үгээ шалгаад дахин оролдоно уу.</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <FilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        budget={budget}
        onBudgetChange={setBudget}
        radius={radius}
        onRadiusChange={setRadius}
      />
    </section>
  );
}

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  category: typeof categories[number];
  onCategoryChange: (value: typeof categories[number]) => void;
  budget: string;
  onBudgetChange: (value: string) => void;
  radius: string;
  onRadiusChange: (value: string) => void;
}

function FilterSheet({
  open,
  onOpenChange,
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  budget,
  onBudgetChange,
  radius,
  onRadiusChange
}: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(26rem,90vw)] border-none p-0">
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="text-heading-3">Шүүлтүүр</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 px-6 py-6">
          <div className="space-y-2">
            <label className="text-body font-medium text-muted-foreground">Хайлтын үг</label>
            <Input value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Ажил хайх…" />
          </div>
          <div className="space-y-2">
            <label className="text-body font-medium text-muted-foreground">Ангилал</label>
            <Select value={category} onValueChange={(value) => onCategoryChange(value as (typeof categories)[number])}>
              <SelectTrigger className="h-11 rounded-lg border-border/60 bg-background/80">
                <SelectValue placeholder="Ангилал" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-body font-medium text-muted-foreground">Төсөв</label>
            <Select value={budget} onValueChange={onBudgetChange}>
              <SelectTrigger className="h-11 rounded-lg border-border/60 bg-background/80">
                <SelectValue placeholder="Төсөв" />
              </SelectTrigger>
              <SelectContent>
                {['Бүгд', '150к хүртэл', '150к-300к', '300к+'].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-body font-medium text-muted-foreground">Радиус</label>
            <input
              type="range"
              min="1"
              max="25"
              value={radius}
              onChange={(event) => onRadiusChange(event.target.value)}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted"
            />
            <span className="text-body-sm text-muted-foreground">{radius} км радиустай хайлт</span>
          </div>
          <div className="sticky bottom-0 mt-4 border-t border-border/60 bg-background/90 px-0 py-4">
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => onOpenChange(false)}>
                Хэрэгжүүлэх
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Болих
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
