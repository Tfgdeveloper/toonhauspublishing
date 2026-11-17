import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const DEFAULT_SLIDES = [
  "/images/Cover-1.png",
  "/images/Cover-2.png",
  "/images/Cover-3.png",
  "/images/Cover-4.png",
  "/images/Cover-5.png",
  "/images/Cover-6.png",
  "/images/Cover-7.png",
  "/images/Cover-8.png",
  "/images/Cover-9.png",
  "/images/Cover-10.png",
  "/images/Cover-11.png",
  "/images/Cover-12.png",
];

type Props = {
  slides?: string[];
  interval?: number;
};

/** Centered, looping carousel: middle slide sharp, side slides blurred. */
export default function PortfolioCarousel({ slides = DEFAULT_SLIDES, interval = 5000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((dir: number) => setActive((a) => (a + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [go, paused, interval, count]);

  // Position relative to the active slide: -1 left, 0 center, 1 right
  const offset = (i: number) => {
    let d = i - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  if (!count) return null;

  return (
    // overflow-x-clip stops the slide-in animation and side slides from creating a horizontal scrollbar
    <div className="w-full overflow-x-clip">
      <Reveal as="section" from="left">
        <div className="pb-glass">
          <h3 className="pb-heading text-center mt-5 text-[28px] md:text-[42px]">
            Discover the Magic  <span className="text-[#70167E]">We've Brought to Every Page</span>
          </h3>

          <div
            className="relative mx-auto mt-6 h-[400px] overflow-hidden min-[576px]:h-[450px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
          >
            {slides.map((src, i) => {
              const d = offset(i);
              const isActive = d === 0;
              const isVisible = Math.abs(d) <= 1;

              return (
                <motion.button
                  type="button"
                  key={src}
                  onClick={() => !isActive && go(d)}
                  tabIndex={isActive ? -1 : 0}
                  aria-label={isActive ? undefined : `Show book sample ${i + 1}`}
                  aria-hidden={!isVisible}
                  className={`absolute left-1/2 top-1/2 block w-[260px] min-[576px]:w-[30%] min-[576px]:max-w-[380px] ${
                    isActive ? "cursor-default" : "cursor-pointer"
                  }`}
                  initial={false}
                  animate={{
                    x: `${-50 + d * 112}%`,
                    y: "-50%",
                    scale: isActive ? 1 : 0.92,
                    opacity: isVisible ? (isActive ? 1 : 0.85) : 0,
                    filter: isActive ? "blur(0px)" : "blur(7px)",
                    zIndex: isActive ? 2 : 1,
                  }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ pointerEvents: isVisible ? "auto" : "none" }}
                >
                  <img
                    src={src}
                    alt={`Children’s book sample ${i + 1}`}
                    width={496}
                    height={644}
                    loading={isVisible ? "eager" : "lazy"}
                    draggable={false}
                    className="h-auto w-full rounded-lg shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
                  />
                </motion.button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-center gap-3">
            <button type="button" onClick={() => go(-1)} className="pb-btn-black px-4" aria-label="Previous slide">
              ‹
            </button>
            <button type="button" onClick={() => go(1)} className="pb-btn-red px-4" aria-label="Next slide">
              ›
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}