import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";

import { AppProviders } from "@/providers/AppProviders";

import SignInPage from "../page";

function renderWithProviders(ui: ReactNode) {
  return render(<AppProviders>{ui}</AppProviders>);
}

describe("SignInPage", () => {
  it("validates required fields", async () => {
    renderWithProviders(<SignInPage />);

    const form = screen.getByTestId("sign-in-form");
    const emailInput = screen.getByLabelText("Имэйл");
    const passwordInput = screen.getByLabelText("Нууц үг");

    await userEvent.click(emailInput);
    await userEvent.tab();
    await userEvent.click(passwordInput);
    await userEvent.tab();

    fireEvent.submit(form);

    expect(await screen.findByText("Имэйл шаардлагатай")).toBeInTheDocument();
    expect(await screen.findByText("Нууц үг дор хаяж 6 тэмдэгт байх ёстой")).toBeInTheDocument();
  });
});
