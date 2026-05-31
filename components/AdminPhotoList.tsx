"use client";
import { useState } from "react";
import Image from "next/image";

interface Photo {
  id: number;
  url: string;
  title: string;
}

export default function AdminPhotoList({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState(initialPhotos);

  async function deletePhoto(id: number) {
    if (!confirm("Are you sure you want to delete this photo forever?")) return;

    const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });

    if (res.ok) {
      setPhotos(photos.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete.");
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
          <div className="aspect-square relative">
            <Image 
              src={photo.url} 
              alt={photo.title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div className="p-3 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold truncate pr-2">{photo.title}</span>
            <button 
              onClick={() => deletePhoto(photo.id)}
              className="text-zinc-500 hover:text-red-500 transition-colors"
              title="Delete Photo"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple SVG Icon for the button
function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5 v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
  );
}