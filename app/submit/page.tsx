"use client";
import { useState } from "react";

export default function StudentSubmitPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Force status to PENDING for students
    formData.append("status", "PENDING");

    const res = await fetch("/api/photos/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
        <div>
          <h1 className="text-4xl font-bold text-red-500 mb-4">Muvaffaqiyatli!</h1>
          <p className="text-zinc-400">Rasm yuborildi. Oqituvchi tasdiqlaganidan so&apos;ng galereyada chiqadi.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 text-sm underline">Yana rasm yuborish</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 bg-[#080808]">
      <div className="max-w-xl mx-auto bg-white/[0.03] p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-red-500 mb-2">
          Showcase submission
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Student Showcase</h1>
        <p className="text-zinc-500 mb-8 text-xs leading-relaxed">
          Submit your best shot. After the instructor reviews and approves your submission, it will be published to the live gallery and mapped on the interactive globe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File Input */}
          <div className="relative group">
            <label className="block w-full text-center border border-dashed border-white/20 hover:border-red-500 hover:bg-white/[0.02] transition-all p-8 rounded-2xl cursor-pointer">
              <input 
                type="file" 
                name="file" 
                required 
                className="hidden" 
                onChange={(e) => {
                  const label = e.target.parentElement?.querySelector(".file-label");
                  if (label && e.target.files?.[0]) {
                    label.textContent = `Selected: ${e.target.files[0].name}`;
                  }
                }}
              />
              <span className="text-2xl block mb-2">📸</span>
              <span className="file-label text-xs uppercase tracking-widest font-black text-zinc-400 group-hover:text-white transition-colors">
                Select Photo from Device
              </span>
            </label>
          </div>

          <input 
            name="authorName" 
            placeholder="Your Name (Ismingiz)" 
            required 
            className="w-full bg-black/45 border border-white/10 p-4 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="title" 
            placeholder="Photo Title" 
            required 
            className="w-full bg-black/45 border border-white/10 p-4 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          
          <div className="grid grid-cols-2 gap-3">
            <input 
              name="location" 
              placeholder="Location (e.g. Tashkent)" 
              className="w-full bg-black/45 border border-white/10 p-4 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
            />
            <input 
              name="coordinates" 
              placeholder="Coordinates (Latitude, Longitude)" 
              className="w-full bg-black/45 border border-white/10 p-4 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white hover:shadow-red-500/20 shadow-lg cursor-pointer transition-all disabled:opacity-35"
          >
            {loading ? "Yuborilmoqda (Uploading)..." : "Yuborish (Submit Frame)"}
          </button>
        </form>
      </div>
    </div>
  );
}
