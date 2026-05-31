"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/photos/upload", {
      method: "POST",
      body: formData, // Send the actual file and text data
    });

    if (res.ok) {
      setPreview(null);
      (e.target as HTMLFormElement).reset();
      router.refresh();
      alert("Photo published successfully!");
    } else {
      alert("Something went wrong.");
    }
    setLoading(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl">
      {/* File Selection & Preview */}
      <label className="block w-full aspect-video border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-red-500 transition-all overflow-hidden relative">
        <input type="file" name="file" className="hidden" onChange={handleFileChange} required />
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <span className="text-2xl mb-2">📁</span>
            <span className="text-xs font-bold uppercase tracking-widest">Select Image from PC</span>
          </div>
        )}
      </label>

      {/* Metadata */}
      <div className="space-y-4">
        <input 
          name="title" 
          placeholder="Photo Title" 
          required 
          className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
        />
        
        <div className="grid grid-cols-2 gap-3">
          <input 
            name="location" 
            placeholder="Location (e.g., Yunusabad)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="coordinates" 
            placeholder="Coordinates (e.g., 41.2995, 69.2401)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input 
            name="camera" 
            placeholder="Camera" 
            defaultValue="Xiaomi 15T Pro" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="iso" 
            type="number" 
            placeholder="ISO (e.g., 50)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="aperture" 
            placeholder="Aperture (e.g., f/1.8)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="shutter" 
            placeholder="Shutter (e.g., 1/1000s)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="focalLength" 
            placeholder="Focal Length (e.g., 23mm)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
          <input 
            name="authorName" 
            placeholder="Author Name (Optional)" 
            className="w-full bg-black/40 border border-white/10 p-3.5 rounded-xl text-sm text-white outline-none focus:border-red-500 transition-colors" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-30 cursor-pointer shadow-lg hover:shadow-red-500/20"
      >
        {loading ? "Saving to Server..." : "Publish to Gallery"}
      </button>
    </form>
  );
}