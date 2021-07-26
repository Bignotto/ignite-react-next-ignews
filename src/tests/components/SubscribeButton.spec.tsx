import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import { SubscribeButton } from "../../components/SubscribeButton";

jest.mock("next-auth/client");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("should render correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now!")).toBeInTheDocument();
  });

  it("redirects to signin when not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now!");
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user has subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "Jon Doe", email: "doe.jon@somemail.com" },
        expires: "some-time",
        userActiveSubscription: "fake-subscription",
      },
      false,
    ]);

    useRouterMocked.mockReturnValue({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now!");
    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
