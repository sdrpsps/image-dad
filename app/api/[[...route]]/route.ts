import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import images from "@/features/images/server/route";
import bot from "@/features/bot/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/images", images)
  .route("/bot", bot);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
