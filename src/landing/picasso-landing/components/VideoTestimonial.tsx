import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMAGES, VIDEOS } from "../assets";
import Reveal from "./Reveal";

/** Replaces the Fancybox video lightbox. */
export default function VideoTestimonial() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Reveal as="section" from="right">
      <div className="pb-glass">
        <div className="flex items-center justify-between gap-4">
          <img src={IMAGES.sec7[0]} alt="" loading="lazy" className="h-auto w-[80px] min-[576px]:w-[160px]" />
          <h3 className="pb-heading flex-1 text-center">
            <span className="text-[#70167E]">See What Authors Have To Say About Our Children’s Book Publishing Services</span>
          </h3>
          <img src={IMAGES.sec7[2]} alt="" loading="lazy" className="h-auto w-[70px] min-[576px]:w-[150px]" />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative w-full max-w-md overflow-hidden rounded-lg md:w-1/3"
            aria-label="Play author video testimonial"
          >
            <img src={IMAGES.videoThumb} alt="" width={1908} height={884} className="h-auto w-full transition-transform duration-300 group-hover:scale-105" />
            <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#70167E] text-white shadow-lg">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Author video testimonial"
          >
            <motion.div
              className="relative w-full max-w-3xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-3xl leading-none text-white"
                aria-label="Close video"
              >
                ×
              </button>
              <video src={VIDEOS.testimonial} controls autoPlay playsInline className="w-full rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}
