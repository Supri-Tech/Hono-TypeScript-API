import { Hono } from "hono";
import { status } from "../utils/status";
import { hashPass, verifyPass } from "../utils/password";
import { UserModel } from "../models/User";
import { datetime } from "../utils/datetime";
import { createJWT } from "../utils/jwt";

const router = new Hono();

router.post("/register", async (c) => {
  try {
    const { username, password, role } = await c.req.json();

    if (!username || !password) {
      return c.json(
        {
          status: status.BAD_REQUEST,
          message: "Username & password are required",
          datetime: datetime(),
        },
        400,
      );
    }

    const registeredUser = await UserModel.findByUsername(username);
    if (registeredUser) {
      return c.json(
        {
          status: status.BAD_REQUEST,
          message: "Username telah digunakan",
          datetime: datetime(),
        },
        400,
      );
    }

    const hashedPass = hashPass(password);
    const user = await UserModel.createUser(username, hashedPass, role);

    return c.json({
      status: status.SUKSES,
      message: "User registered successfully",
      datetime: datetime(),
      user,
    });
  } catch (err) {
    return c.json(
      {
        status: status.GAGAL,
        message: err as Error,
        datetime: datetime(),
      },
      500,
    );
  }
});

router.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();

    const user = await UserModel.findByUsername(username);
    if (!user || !verifyPass(password, user.password)) {
      return c.json(
        {
          status: status.BAD_REQUEST,
          message: "Invalid username or password",
          datetime: datetime(),
        },
        400,
      );
    }

    const token = await createJWT({ id: user.id, role: user.role });
    return c.json({
      status: status.SUKSES,
      message: "Login successful",
      datetime: datetime(),
      token,
    });
  } catch (err) {
    return c.json(
      {
        status: status.GAGAL,
        message: err as Error,
        datetime: datetime(),
      },
      500,
    );
  }
});

export default router;
