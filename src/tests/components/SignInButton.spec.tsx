import { render, screen } from "@testing-library/react";
import { SignInButton } from "../../components/SignInButton";
import { useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";

jest.mock("next-auth/client");

describe("SignInButton component", () => {
  it("should render correctly with user NOT authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValue([null, false]);
    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("should render correctly when user IS authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValue([
      {
        user: { name: "Jon Doe", email: "doe.jon@somemail.com" },
        expires: "some-time",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("Jon Doe")).toBeInTheDocument();
  });
});
