import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInPage from "@/app/(public)/auth/(sign-in)/page";

const mockLogin = vi.fn();
const mockSetToken = vi.fn();
const mockSetUser = vi.fn();
const mockReplace = vi.fn();
const mockToast = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    token: null,
    user: null,
    isLoading: false,
    setToken: mockSetToken,
    setUser: mockSetUser,
    logout: vi.fn(),
    refresh: vi.fn()
  })
}));

vi.mock("@/lib/auth", () => ({
  login: (...args: unknown[]) => mockLogin(...(args as Parameters<typeof mockLogin>))
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace })
}));

vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({ toast: mockToast })
}));

describe("SignInPage", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockSetToken.mockReset();
    mockSetUser.mockReset();
    mockReplace.mockReset();
    mockToast.mockReset();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<SignInPage />);

    await userEvent.click(screen.getByRole("button", { name: "Нэвтрэх" }));

    expect(await screen.findByText("Имэйл шаардлагатай.")).toBeInTheDocument();
    expect(await screen.findByText("Нууц үг дор хаяж 6 тэмдэгт байх ёстой.")).toBeInTheDocument();
  });

  it("submits successfully and redirects to dashboard", async () => {
    mockLogin.mockResolvedValue({
      access_token: "token-123",
      user: { id: "1", name: "Test", email: "user@example.com" }
    });

    render(<SignInPage />);

    await userEvent.type(screen.getByLabelText("Имэйл"), "user@example.com");
    await userEvent.type(screen.getByLabelText("Нууц үг"), "secret1");
    await userEvent.click(screen.getByRole("button", { name: "Нэвтрэх" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: "user@example.com", password: "secret1" });
      expect(mockSetToken).toHaveBeenCalledWith("token-123");
      expect(mockSetUser).toHaveBeenCalledWith({ id: "1", name: "Test", email: "user@example.com" });
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });
});
