import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("todos", (table) => {
    table.increments("id").primary();
    table.string("title", 100).notNullable();
    table.text("description").notNullable();
    table
      .enu("status", ["not started", "on going", "finished"])
      .notNullable()
      .defaultTo("not started");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("todos");
}
