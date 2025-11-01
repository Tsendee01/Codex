import "@testing-library/jest-dom/vitest";
import { createElement, Fragment, type ReactNode } from "react";
import { vi } from "vitest";

if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    })
  });
}

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: ReactNode }) => createElement("a", props, children)
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/"
}));

vi.mock("framer-motion", () => ({
  __esModule: true,
  AnimatePresence: ({ children }: { children: ReactNode }) => createElement(Fragment, null, children),
  motion: new Proxy(
    {},
    {
      get: (_, element) => (props: Record<string, unknown>) =>
        createElement(element as string, props)
    }
  ),
  useReducedMotion: () => true
}));
