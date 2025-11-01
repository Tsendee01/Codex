import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metricCards = [
  {
    title: "Нийт ажлын тоо",
    value: "12",
    description: "Мэдээлэл ачааллаж байна…"
  },
  {
    title: "Гүйцэтгэж буй ажил",
    value: "4",
    description: "Одоогоор мэдээлэл алга."
  },
  {
    title: "Баталгаажсан хэрэглэгч",
    value: "87",
    description: "Мэдээлэл ачааллаж байна…"
  },
  {
    title: "Шинэ саналууд",
    value: "6",
    description: "Одоогоор мэдээлэл алга."
  }
] as const;

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">Тойм</h1>
        <p className="text-sm text-muted-foreground">Мэдээлэл ачааллаж байна…</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <Card
            key={card.title}
            className="border border-primary/10 bg-background/80 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-base font-semibold text-foreground">
                {card.title}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-dashed border-primary/30 bg-background/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Бүрэн дэлгэрэнгүй хувилбар тун удахгүй.
          </CardTitle>
          <CardDescription>
            Эрэлт хэрэгцээтэй мэдээллүүдийг нэг цонхноос хянах боломжийг бид бэлтгэж байна. Түр хүлээнэ үү.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Одоогоор мэдээлэл алга. Та ажлын санал илгээх эсвэл шинэ ажлын зар үүсгэн өгөгдлөө хурдан цуглуулах боломжтой.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
