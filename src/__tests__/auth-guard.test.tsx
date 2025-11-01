import { render, waitFor } from "@testing-library/react";

import { GuardedLayout } from "@/middleware-guard";

const mockReplace = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(() => ({ token: null, isLoading: false }))
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace })
}));

describe("GuardedLayout", () => {
  beforeEach(() => {
    mockReplace.mockReset();
  });

  it("redirects unauthenticated users to sign-in", async () => {
    render(
      <GuardedLayout>
        <div>Secure</div>
      </GuardedLayout>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/auth/sign-in");
    });
  });
});
