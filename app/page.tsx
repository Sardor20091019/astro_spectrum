import Hero from "@/components/Hero";
import { prisma } from "@/lib/prisma";
import { Camera, Heart, MapPin, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const photos = await prisma.photo.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { likes: true, comments: true, ratings: true },
      },
    },
  });

  const ratingMap = new Map<number, number>();
  await Promise.all(
    photos.map(async (photo) => {
      const stats = await prisma.rating.aggregate({
        where: { photoId: photo.id },
        _avg: { value: true },
      });
      ratingMap.set(photo.id, stats._avg.value ? Number(stats._avg.value.toFixed(1)) : 0);
    }),
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />

      <section id="gallery" className="px-4 py-20 md:px-8">
        <div className="mx-auto mb-10 flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-red-400/80">Curated gallery</p>
            <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl">Recent frames</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/45">
            A polished, interactive photography archive with live likes, ratings, comments, and cinematic viewing.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          {photos.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/15 px-6 py-20 text-center text-white/45">
              Galereya hozircha bo&apos;sh. Tez orada yangi rasmlar qo&apos;shiladi.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <Link
                  href={`/photos/${photo.id}`}
                  key={photo.id}
                  className={`group relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-red-400/45 ${
                    index % 5 === 0 ? "lg:row-span-2" : ""
                  }`}
                >
                  <div className={index % 5 === 0 ? "relative aspect-[4/5] lg:aspect-[4/6]" : "relative aspect-[4/5]"}>
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />
                    <div className="absolute left-4 right-4 top-4 flex justify-between">
                      <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
                        {photo.authorName || "Original"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{photo.title}</h3>
                      <div className="mt-4 space-y-2 text-xs text-white/60">
                        <p className="flex items-center gap-2">
                          <MapPin size={13} className="text-red-400" />
                          {photo.location || "Unknown location"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Camera size={13} className="text-red-400" />
                          {photo.camera || "Xiaomi 15T Pro"} | ISO {photo.iso || "-"} | {photo.aperture || "-"}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center gap-3 text-xs text-white/70">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-xl">
                          <Heart size={13} className="text-red-400" /> {photo._count.likes}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-xl">
                          <Star size={13} className="text-red-400" /> {(ratingMap.get(photo.id) ?? 0).toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-xl">
                          <MessageCircle size={13} className="text-red-400" /> {photo._count.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
