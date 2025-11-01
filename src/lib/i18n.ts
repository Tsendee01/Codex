const PATH_SEPARATOR = "." as const;

export const defaultLocale = "mn" as const;

export type SupportedLocale = typeof defaultLocale;

type LocaleMessages = {
  appName: string;
  navbar: {
    searchPlaceholder: string;
  };
  sidebar: {
    items: Array<{ label: string; href: string }>;
  };
  auth: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    signIn: string;
    signUp: string;
    error: string;
  };
  dashboard: {
    welcome: string;
  };
};

export const messages: Record<SupportedLocale, LocaleMessages> = {
  mn: {
    appName: "{{APP_NAME}}",
    navbar: {
      searchPlaceholder: "Ажил хайх…"
    },
    sidebar: {
      items: [
        { label: "Тойм", href: "/" },
        { label: "Ажил хайх", href: "/jobs" },
        { label: "Ажил үүсгэх", href: "/jobs/new" },
        { label: "Мессеж", href: "/messages" },
        { label: "Профайл", href: "/profile" }
      ]
    },
    auth: {
      email: "Имэйл",
      password: "Нууц үг",
      name: "Нэр",
      confirmPassword: "Нууц үгээ давт",
      signIn: "Нэвтрэх",
      signUp: "Бүртгүүлэх",
      error: "Нэвтрэхэд алдаа гарлаа. Та мэдээллээ шалгана уу."
    },
    dashboard: {
      welcome: "Эрэлт хэрэгцээтэй ажлуудыг төвөггүй зохион байгуулаарай."
    }
  }
};

export function translate(path: string, locale: SupportedLocale = defaultLocale): string | undefined {
  const segments = path.split(PATH_SEPARATOR).filter(Boolean);
  const value = segments.reduce<unknown>((accumulator, segment) => {
    if (typeof accumulator === "object" && accumulator !== null) {
      const record = accumulator as Record<string, unknown>;
      return record[segment];
    }

    return undefined;
  }, messages[locale]);

  return typeof value === "string" ? value : undefined;
}

export function getAppName(locale: SupportedLocale = defaultLocale) {
  return messages[locale].appName;
}
