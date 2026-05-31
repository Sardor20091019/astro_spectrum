"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { photos as mockPhotos } from "../data/photos"
import ReviewSection from "./ReviewSection"
import ReviewList from "./ReviewList"

type PhotoType = {
  id: number;
  url?: string;
  src?: string;
  title: string;
  location: string | null;
  coordinates?: string | null;
};

export default function PhotoGrid({ initialPhotos }: { initialPhotos?: PhotoType[] }) {
  const displayPhotos = (initialPhotos || mockPhotos) as PhotoType[];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleReviewSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <section className="py-10 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayPhotos.map((photo, index) => (
          <motion.div 
            key={photo.id}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 group shadow-lg"
            onClick={() => setSelectedIndex(index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={photo.url || photo.src} 
                alt={photo.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <h4 className="text-white font-black uppercase text-sm tracking-wide">{photo.title}</h4>
                <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-1">{photo.location || "Unknown Location"}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 overflow-y-auto"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-6xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="md:w-2/3 bg-black flex items-center justify-center p-4">
                <img 
                  src={displayPhotos[selectedIndex].url || displayPhotos[selectedIndex].src} 
                  className="max-h-[80vh] w-auto object-contain rounded-xl" 
                  alt=""
                />
              </div>

              {/* Data Side */}
              <div className="md:w-1/3 p-8 overflow-y-auto border-l border-white/10 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{displayPhotos[selectedIndex].title}</h2>
                  <p className="text-red-500 text-xs font-bold tracking-widest uppercase mb-6">{displayPhotos[selectedIndex].location || "Unknown Location"}</p>
                  
                  <ReviewSection 
                    photoId={displayPhotos[selectedIndex].id} 
                    onSuccess={handleReviewSuccess} 
                  />
                  
                  <div className="mt-10">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Reviews</h3>
                    <ReviewList 
                      photoId={displayPhotos[selectedIndex].id} 
                      refreshTrigger={refreshKey} 
                    />
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <a 
                    href={`/photos/${displayPhotos[selectedIndex].id}`}
                    className="block text-center w-full bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                    View details
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}