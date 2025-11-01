import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { messages } from "@/lib/i18n";

export default function ProfilePage() {
  const appName = messages.mn.appName;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          Профайл
        </h1>
        <p className="text-sm text-muted-foreground">Мэдээлэл ачааллаж байна…</p>
      </header>

      <Card className="border border-primary/10 bg-background/80">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{appName} хэрэглэгч</CardTitle>
          <CardDescription>Профайлын мэдээлэл удахгүй идэвхжинэ.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Одоогоор мэдээлэл алга. Танилцуулга, ажлын туршлага, ур чадваруудыг нэг дор харах боломжийг бэлтгэж байна.</p>
          <p>Бүрэн дэлгэрэнгүй хувилбар тун удахгүй.</p>
        </CardContent>
      </Card>
    </section>
  );
}
