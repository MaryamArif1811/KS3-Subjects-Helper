"use server";

import { createAnonymousUser } from "@/lib/db/queries";
import { signIn } from "./auth";

export type GuestLoginState = {
  status: "idle" | "in_progress" | "success" | "failed";
};

export const loginAsGuest = async (
  _: GuestLoginState
): Promise<GuestLoginState> => {
  try {
    // Create an anonymous user in the database
    const [guestUser] = await createAnonymousUser();

    // Sign in using the guest provider
    await signIn("guest", {
      id: guestUser.id,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    return { status: "failed" };
  }
};
