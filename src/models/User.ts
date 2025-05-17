import { db } from "../db/knex";

export interface User {
  id: number;
  username: string;
  password: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export class UserModel {
  static async createUser(
    username: string,
    password: string,
    role: "user" | "admin" = "user",
  ) {
    const [user] = await db("users").insert({ username, password, role }, "*");
    return user;
  }

  static async findByUsername(username: string) {
    return await db<User>("users").where({ username }).first();
  }

  static async updatePassword(userId: number, newPassword: string) {
    return db("users")
      .where({ id: userId })
      .update("password", newPassword, "*");
  }

  static async getById(userId: number) {
    return await db<User>("users").where({ id: userId }).first();
  }
}
