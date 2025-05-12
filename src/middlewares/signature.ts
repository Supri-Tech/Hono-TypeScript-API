import { MiddlewareHandler } from "hono";
import { generateHMACSignature } from "../utils/hmac";
import { config } from "dotenv";

config();

export const signatureMiddleware: MiddlewareHandler = async (c, next) => {
  const clientKey = c.req.header("x-client-key");
  const signature = c.req.header("x-signature");
  const timestamp = c.req.header("x-timestamp");
  const secret = process.env.SHARED_SECRET;

  if (!secret) {
    return c.json(
      { message: "Server misconfiguration: missing SHARED_SECRET" },
      500,
    );
  }

  if (!clientKey || !signature || !timestamp) {
    return c.json({ message: "Missing required signature headers" }, 400);
  }

  const body = await c.req.text();
  const expectSignature = generateHMACSignature({
    clientKey,
    timestamp,
    body,
    secret,
  });

  if (expectSignature !== signature) {
    return c.json({ message: "Invalid signature" }, 401);
  }

  c.req.json = async () => JSON.parse(body);
  await next();
};
