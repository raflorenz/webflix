import { fetchMediaDetails } from "@/lib/api";

export default async function Page({ params }) {
  const id = (await params).media[1];
  const media_type = (await params).media[0];

  const details = await fetchMediaDetails({ id, media_type });

  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-between items-center">
        <h1 className="my-8 text-6xl text-[#e50914] uppercase">
          {details.title || details.name}
        </h1>
        <p>{details.overview}</p>
      </div>
    </div>
  );
}
