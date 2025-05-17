import { MiddlewareHandler } from "hono";
import { verifyJWT } from "../utils/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const auth = c.req.header("Authorization");
  if (!auth?.startsWith("Bearer ")) return c.text("Unauthorized", 401);

  try {
    const token = auth.split(" ")[1];
    const payload = await verifyJWT(token);
    c.set("user", payload);
    await next();
  } catch (err) {
    return c.text("Invalid token", 401);
  }
};
