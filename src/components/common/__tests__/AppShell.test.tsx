import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { AppShell } from "@/components/common/AppShell";
import { messages } from "@/lib/i18n";
import { AppProviders } from "@/providers/AppProviders";

function renderApp(ui: ReactNode) {
  return render(<AppProviders>{ui}</AppProviders>);
}

describe("AppShell", () => {
  it("renders navbar and sidebar", () => {
    renderApp(
      <AppShell>
        <div>Дотоод контент</div>
      </AppShell>
    );

    expect(screen.getByText(messages.mn.appName)).toBeInTheDocument();
    expect(screen.getByText("Тойм")).toBeInTheDocument();
    expect(screen.getByText("Дотоод контент")).toBeInTheDocument();
  });
});
