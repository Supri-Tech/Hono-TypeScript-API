import { db } from "../db/knex";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: "not started" | "on going" | "finished";
  id_user: number;
  created_at: string;
  updated_at: string;
}

export class TodoModel {
  static async createTodo(
    title: string,
    description: string,
    status: "not started" | "on going" | "finished" = "not started",
    id_user: number,
  ) {
    const [todo] = await db("todos").insert({
      title,
      description,
      status,
      id_user,
    });
    return todo;
  }

  static async findByID(id: number) {
    return await db<Todo>("todos").where({ id }).first();
  }

  static async updateTodo(
    todoId: number,
    newTitle: string,
    newDescription: string,
  ) {
    return db("todos")
      .where({ id: todoId })
      .update({ title: newTitle, description: newDescription });
  }

  static async deleteById(todoId: number) {
    return await db<Todo>("todos").where({ id: todoId }).delete();
  }
}
