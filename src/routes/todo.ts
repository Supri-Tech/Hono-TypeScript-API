import { Hono } from "hono";
import { status } from "../utils/status";
import { datetime } from "../utils/datetime";

const router = new Hono();

router.get("/todos", async (c) => {
  try {
    const {} = await c.req.json();
  } catch (err) {
    return c.json({
      status: status.GAGAL,
      message: err as Error,
      datetime: datetime(),
    });
  }
});
