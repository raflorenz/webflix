import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatRuntime(runtime) {
  if (runtime === 0) return "N/A";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  let result = "";

  if (hours > 0) result += `${hours}h`;

  if (minutes > 0) result += `${minutes}m`;

  return result;
}

export function slugify(str) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
