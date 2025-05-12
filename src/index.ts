import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import AuthRouter from "./routes/auth";
// import { signatureMiddleware } from "./middlewares/signature";

const app = new Hono();

app.use(logger());
app.use(secureHeaders());
app.use(cors());
// app.use(signatureMiddleware);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/auth", AuthRouter);

export default app;
