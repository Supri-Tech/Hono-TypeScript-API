import { Context } from "hono";

export const jsonResponse = <T extends Record<string, unknown>>(
  c: Context,
  data: T,
  status = 200,
) => {
  return c.json<T>(data, status);
};
