import Link from "next/link";

export default async function Home() {
  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-between items-center">
        <h1 className="my-8 text-6xl text-[#e50914] uppercase">Webflix</h1>
        <Link href="/discover">Discover</Link>
      </div>
    </div>
  );
}
