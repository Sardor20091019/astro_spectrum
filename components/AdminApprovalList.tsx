"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";

type PendingPhoto = {
  id: number;
  url: string;
  title: string;
  authorName: string | null;
};

export default function AdminApprovalList({ pendingPhotos }: { pendingPhotos: PendingPhoto[] }) {
  const [list, setList] = useState(pendingPhotos);

  async function handleAction(id: number, action: 'approve' | 'delete') {
    const method = action === 'approve' ? 'PATCH' : 'DELETE';
    const endpoint = action === 'approve' ? `/api/photos/${id}/approve` : `/api/photos/${id}`;
    
    const res = await fetch(endpoint, { method });
    if (res.ok) {
      setList(list.filter(p => p.id !== id));
    }
  }

  if (list.length === 0) return <p className="text-zinc-500 text-xs italic">No pending submissions.</p>;

  return (
    <div className="space-y-4">
      {list.map(photo => (
        <div key={photo.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
          <Image src={photo.url} alt={photo.title} width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate uppercase">{photo.title}</p>
            <p className="text-[10px] text-zinc-500 uppercase">By {photo.authorName || "Anonymous"}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleAction(photo.id, 'approve')} className="p-2 bg-green-600/20 text-green-500 rounded-lg hover:bg-green-600 hover:text-white transition-all">
              <Check size={16} />
            </button>
            <button onClick={() => handleAction(photo.id, 'delete')} className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
