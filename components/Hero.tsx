"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#666] mb-6 font-medium">
          Photography by Sardor Sunatullayev
        </p>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-6">
          Astro<span className="text-red-500">spectrum</span>
        </h1>
        <p className="text-[#666] text-sm md:text-base font-light leading-relaxed mb-10 max-w-md mx-auto">
          Exploring light, color, and the world through photography.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="#gallery" className="btn-primary px-6 py-3">View Gallery</a>
          <Link href="/submit" className="btn-ghost px-6 py-3">Submit a Photo</Link>
        </div>
      </div>
    </section>
  );
}