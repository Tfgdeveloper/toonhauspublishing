import { useCallback, useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Reveal from "./Reveal";

type Review = {
  name: string;
  location?: string;
  title: string;
  text: string;
  rating: number; // 1–5
};

const REVIEWS: Review[] = [
  {
    name: "Emily R",
    location: "USA",
    title: "Publishing my first children's book",
    text: "Publishing my first children's book was easier than I imagined! The team was friendly, helpful, and made sure every detail was just right. I absolutely love how my book turned out!",
    rating: 5,
  },
  {
    name: "James T",
    title: "I had a story in mind for years",
    text: "I had a story in mind for years but didn't know where to start. Toon Haus Publishing helped me turn my idea into a beautiful book. The illustrations were amazing!",
    rating: 5,
  },
  {
    name: "Sarah M",
    title: "The whole process was smooth and enjoyable",
    text: "The whole process was smooth and enjoyable. The team listened to my ideas, kept me updated, and created a children's book that looks even better than I expected!",
    rating: 5,
  },
  {
    name: "Daniel P",
    title: "I couldn't be happier with my experience!",
    text: "I couldn't be happier with my experience! From editing to illustrations, everything was handled with care. Seeing my finished book was such a special moment.",
    rating: 5,
  },
  {
    name: "Olivia B",
    title: "What a wonderful experience! The illustrations",
    text: "What a wonderful experience! The illustrations brought my characters to life, and the team made publishing my first children's book simple and stress-free.",
    rating: 5,
  },
  {
    name: "Michael A",
    title: "I loved working with this team!",
    text: "I loved working with this team! They understood my vision and helped me create a colorful, engaging book. I'm excited to share it with young readers!",
    rating: 5,
  },
];

const GREEN = "#00b67a";

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`${box} flex items-center justify-center`}
          style={{ backgroundColor: i < rating ? GREEN : "#dcdce6" }}
        >
          <Star className={`${icon} fill-white text-white`} strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}

const initials = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

export default function Testimonials({ reviews = REVIEWS, interval = 6000 }: { reviews?: Review[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = reviews.length;

  const go = useCallback((dir: number) => setActive((a) => (a + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [go, paused, interval, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  if (!count) return null;

  return (
    <div className="w-full overflow-x-clip">
      <Reveal as="section" from="right">
        <div className="pb-glass">
          <h3 className="pb-heading text-center text-[28px] md:text-[42px]">
            <span className="text-[#70167E]">What Our Authors Say</span>
          </h3>

          {/* Rating summary bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[#191919]">
            <span className="text-xl font-bold">Excellent</span>
            <Stars rating={5} />
            <span className="text-sm text-[#191919]/70">Loved by our authors</span>
          </div>

          {/* Carousel */}
          <div
            className="relative mx-auto mt-6 max-w-[760px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Author reviews"
          >
            <div className="overflow-hidden rounded-[10px]">
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                animate={{ x: `-${active * 100}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 22 }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
              >
                {reviews.map((r, i) => (
                  <div
                    key={r.name + i}
                    className="w-full shrink-0 p-1"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={i !== active}
                  >
                    <article className="flex h-full select-none flex-col rounded-[10px] border border-[#e5e5dd] bg-white p-6 text-left shadow-[0_4px_30px_rgba(0,0,0,.08)] sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Stars rating={r.rating} size="sm" />
                        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#191919]/60">
                          <BadgeCheck className="h-4 w-4" style={{ color: GREEN }} />
                          Verified review
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-bold text-[#191919]">{r.title}</h4>
                      <p className="mb-0 mt-2 text-[15px] leading-[1.75] text-[#191919]/80">{r.text}</p>

                      <div className="mt-6 flex items-center gap-3 border-t border-[#ececec] pt-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#70167E] text-sm font-bold text-white">
                          {initials(r.name)}
                        </span>
                        <div className="leading-tight">
                          <p className="mb-0 font-bold text-[#191919]">{r.name}</p>
                          {r.location && <p className="mb-0 text-[13px] text-[#191919]/60">{r.location}</p>}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </motion.div>
            </div>

            {count > 1 && (
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#191919]/15 bg-white text-[#191919] transition-colors hover:bg-[#191919] hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Go to review ${i + 1}`}
                      aria-current={i === active}
                      className="h-2.5 rounded-full transition-all duration-300"
                      style={{ width: i === active ? 24 : 10, backgroundColor: i === active ? GREEN : "#c8c8d0" }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#191919]/15 bg-white text-[#191919] transition-colors hover:bg-[#191919] hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}