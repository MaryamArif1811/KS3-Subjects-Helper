import "server-only";

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { ChatSDKError } from "../errors";
import { user, type User } from "./schema";

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

/**
 * Create an anonymous user.
 * No email, no password, no personal data.
 */
export async function createAnonymousUser(): Promise<User> {
  try {
    const [created] = await db
      .insert(user)
      .values({ createdAt: new Date() })
      .returning();

    return created;
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to create user");
  }
}

/**
 * Get a user by ID.
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const [found] = await db
      .select()
      .from(user)
      .where(eq(user.id, id));

    return found ?? null;
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to get user");
  }
}
