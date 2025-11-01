import { Briefcase, MessageCircle, PenSquare, Search, UserCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { messages } from "@/lib/i18n";
import { typography } from "@/lib/typography";

const dashboardCards = [
  {
    title: "Идэвхтэй ажлын зар",
    description: "Одоогоор идэвхтэй ажлын зар байхгүй байна.",
    icon: Briefcase,
    actionLabel: "Ажил үүсгэх",
    badge: "Шинэ"
  },
  {
    title: "Авсан санал",
    description: "Санал хараахан ирээгүй байна.",
    icon: MessageCircle,
    actionLabel: "Санал шалгах"
  },
  {
    title: "Шинэ хүсэлт",
    description: "Танд хараахан хүсэлт ирээгүй байна.",
    icon: PenSquare,
    actionLabel: "Ажлын хүсэлт илгээх"
  },
  {
    title: "Хадгалсан ажлууд",
    description: "Та одоогоор ажил хадгалаагүй байна.",
    icon: Search,
    actionLabel: "Ажил хайх"
  }
];

export default function DashboardPage() {
  const { appName } = messages.mn;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-semibold text-title-sm sm:text-title-md">{appName} самбар</h1>
        <p className="text-muted-foreground" style={typography.body.md}>
          Нэг удаагийн ажлууд, санал, харилцаагаа төвлөрүүлж удирдаарай.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className="flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <CardDescription>{card.description}</CardDescription>
                {card.badge ? <Badge>{card.badge}</Badge> : null}
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-2/3" />
                <Button variant="secondary" className="w-fit">
                  {card.actionLabel}
                </Button>
              </CardContent>
            </Card>
          );
        })}
        <Card className="col-span-full flex flex-col justify-between lg:col-span-3 xl:col-span-1">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Захидал</CardTitle>
              <UserCircle2 className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <CardDescription>
              Харилцагчдаасаа ирсэн шинэ зурвас, саналуудаа эндээс хараарай.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 rounded-lg border border-dashed p-4 text-center">
              <p className="text-sm font-medium">Хоосон төлөв</p>
              <p className="text-sm text-muted-foreground">
                Одоогоор шинэ мессеж алга байна. Ажил хайж эсвэл санал илгээж эхлээрэй.
              </p>
            </div>
            <Button className="w-full" variant="default">
              Мессеж рүү очих
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
