export const dashboardStats = [
  {
    title: "Нийт ажлын тоо",
    value: "24",
    trend: "+12%",
    description: "Сүүлийн 7 хоногоор",
    sparkline: "from-accent/70 via-accent/40 to-transparent"
  },
  {
    title: "Идэвхтэй төслүүд",
    value: "6",
    trend: "+2",
    description: "Гүйцэтгэж буй",
    sparkline: "from-primary/60 via-primary/30 to-transparent"
  },
  {
    title: "Шинэ саналууд",
    value: "9",
    trend: "+4",
    description: "Өнөөдөр орсон",
    sparkline: "from-support/80 via-support/40 to-transparent"
  },
  {
    title: "Дундаж үнэлгээ",
    value: "4.8",
    trend: "0.2",
    description: "Ажил гүйцэтгэгч",
    sparkline: "from-muted/90 via-muted/40 to-transparent"
  }
] as const;

export const dashboardRecentJobs = [
  {
    id: "1",
    title: "Зургийн студи цэвэрлэх",
    date: "Өчигдөр",
    price: "180,000₮",
    status: "Хяналтанд"
  },
  {
    id: "2",
    title: "Контент зураг авах туслалцаа",
    date: "2 өдрийн өмнө",
    price: "250,000₮",
    status: "Шинэ"
  }
];

export const dashboardOffers = [
  {
    id: "1",
    name: "Г.Цэнгүүн",
    job: "Ил захидал хүргэлт",
    price: "90,000₮",
    time: "3 цагийн өмнө"
  },
  {
    id: "2",
    name: "А.Баярмаа",
    job: "Нягтлангийн тайлан",
    price: "320,000₮",
    time: "5 цагийн өмнө"
  }
];
