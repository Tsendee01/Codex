import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          Мессеж
        </h1>
        <p className="text-sm text-muted-foreground">Мэдээлэл ачааллаж байна…</p>
      </header>

      <Card className="border border-primary/10 bg-background/80">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Одоогоор мэдээлэл алга.</CardTitle>
          <CardDescription>
            Харилцагчдаас ирсэн зурвас, санал хүсэлтүүд тань энд харагдана.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Бүрэн дэлгэрэнгүй хувилбар тун удахгүй. Таны илгээсэн болон хүлээн авсан бүх мессежийг нэг дороос хянах
            боломжтой болгохоор бид ажиллаж байна.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
