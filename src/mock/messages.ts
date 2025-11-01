export interface MockThread {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface MockMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
}

export const mockThreads: MockThread[] = [
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

export const mockMessages: MockMessage[] = [
  { id: "m1", sender: "Та", content: "Сайн байна уу, зураг авалтын байршлыг баталгаажуулна уу?", time: "09:50" },
  { id: "m2", sender: "Г.Цэнгүүн", content: "Сайн байна уу! 11:00 цагт студид бэлэн байна.", time: "09:53" },
  { id: "m3", sender: "Та", content: "Гайхалтай, хэрэгцээт хэрэгслийг бэлдээрэй.", time: "09:55" },
  { id: "m4", sender: "Г.Цэнгүүн", content: "Мэдээж. Сүүлийн фото багц илгээгдлээ.", time: "13:24" }
];
