import { pgTable, text, integer, doublePrecision } from "drizzle-orm/pg-core";

export const mediaTable = pgTable("media", {
  id: integer().primaryKey().notNull(),
  media_type: text(),
  title: text(),
  name: text(),
  poster_path: text(),
  release_date: text(),
  first_air_date: text(),
  vote_average: doublePrecision(),
  number_of_episodes: integer(),
  runtime: integer(),
  status: text(),
});
