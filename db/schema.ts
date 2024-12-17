import { pgTable, serial, text, integer, numeric } from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: serial().primaryKey(),
  title: text(),
  name: text(),
  poster_path: text(),
  release_date: text(),
  first_air_date: text(),
  vote_average: numeric({ precision: 5, scale: 3 }),
  number_of_episodes: integer(),
  runtime: integer(),
  status: text(),
});
