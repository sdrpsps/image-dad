import { createMiddleware } from "hono/factory";
import { auth, Session, User } from "@/lib/auth";
import { headers } from "next/headers";

type AdditionalContext = {
  Variables: {
    session: Session;
    user: User;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("session", session);
    c.set("user", session.user);

    await next();
  }
);
