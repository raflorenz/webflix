"use client";

import { addToWatchedList } from "@/lib/actions";

export default function ButtonAddToWatchedList({ media }) {
  return (
    <button
      className="p-4 my-8 leading-none bg-[#e50914] font-bold text-white uppercase"
      onClick={() => addToWatchedList(media)}
    >
      Add to watched list
    </button>
  );
}
