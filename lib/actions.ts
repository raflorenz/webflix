"use server";

import { db } from "@/db";
import { mediaTable } from "@/db/schema";

export async function addToWatchedList(media) {
  await db.insert(mediaTable).values({
    id: media.id,
    media_type: media.media_type,
    title: media.title,
    name: media.name,
    poster_path: media.poster_path,
    release_date: media.release_date,
    first_air_date: media.first_air_date,
    vote_average: media.vote_average,
    number_of_episodes: media.number_of_episodes,
    runtime: media.runtime,
    status: media.status,
  });
}
