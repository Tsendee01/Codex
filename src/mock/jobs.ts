export interface MockJob {
  id: string;
  title: string;
  category: string;
  price: string;
  distance: string;
  rating: number;
  status: "Шинэ" | "Яаралтай" | "Хугацаа дууссан";
}

export const mockJobCategories = ["Бүгд", "Маркетинг", "Админ", "Техник", "Хэл", "Үйл ажиллагаа"] as const;

export const mockJobs: MockJob[] = [
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
