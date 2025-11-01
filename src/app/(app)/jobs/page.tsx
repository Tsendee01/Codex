import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobsPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          Ажил хайх
        </h1>
        <p className="text-sm text-muted-foreground">Мэдээлэл ачааллаж байна…</p>
      </header>

      <Card className="border border-primary/10 bg-background/80">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Одоогоор мэдээлэл алга.</CardTitle>
          <CardDescription>
            Шүүлтүүр, хайлтын хэсэг бэлэн болмогц та ажлын саналуудаа шууд эндээс харах болно.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Бүрэн дэлгэрэнгүй хувилбар тун удахгүй. Түр хугацаанд та ажлын заруудыг гар аргаар нэмэх эсвэл багийн
            гишүүдтэйгээ хуваалцах боломжтой.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
