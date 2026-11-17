import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const SERVICES = [
  {
    title: "Writing",
    image: "/images/landing/writing.png",
    text: "Have a wonderful idea but need help finding the right words? Our creative writers transform your imagination into delightful, age-appropriate stories filled with adventure, heart, and unforgettable characters.",
  },
  {
    title: "Editing & Proofreading",
    image: "/images/landing/editing.png",
    text: "Little readers deserve beautifully written stories! Our editors carefully polish every sentence, perfect the flow, and refine your manuscript while preserving the unique charm of your storytelling voice.",
  },
  {
    title: "Illustrations",
    image: "/images/landing/illustration.png",
    text: "Let your characters leap off the page! Our talented artists create vibrant, imaginative illustrations that capture every emotion, spark curiosity, and transport young readers into magical new worlds.",
  },
  {
    title: "Marketing",
    image: "/images/landing/marketing.png",
    text: "Your story deserves an audience as wonderful as its imagination! Our creative marketing solutions help introduce your book to parents, educators, and young readers through engaging promotional campaigns.",
  },
  {
    title: "Audiobook",
    image: "/images/landing/audiobook.png",
    text: "Bring every adventure to life beyond the page! Our audiobook solutions transform your children's story into an enchanting listening experience, filled with expressive narration that makes every moment memorable.",
  },
  {
    title: "Video Trailer",
    image: "/images/landing/video.png",
    text: "Give your story a magical first impression! Our captivating book trailers combine imaginative visuals and engaging storytelling to build excitement and inspire families to discover the adventure waiting inside.",
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    // overflow-x-clip stops the slide-in animations from creating a horizontal scrollbar
    <div className="w-full overflow-x-clip">
      <Reveal as="section" from="left">
        <div className="pb-glass">
          <div className="text-center">
            <h3 className="pb-heading text-center text-[28px] md:text-[42px]">
              <span className="text-[#70167E]">Complete Children's Book Publishing Solutions</span>
            </h3>
            <p>
              Every wonderful children's book begins with a spark of imagination. At Toon Haus Publishing, we turn that spark into something extraordinary with creative storytelling, delightful illustrations, and expert publishing solutions designed to make your journey from dream to bookshelf effortless.
            </p>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s, i) => {
              const white = i % 2 === 1; // old ".whit" variant on every second card
              return (
                <Reveal key={s.title} from="right" delay={(i % 3) * 0.2}>
                  <div
                    className={`h-full rounded-[10px] border-2 border-white p-6 text-center shadow-[0_4px_30px_rgba(0,0,0,.1)] ${
                      white ? "bg-white" : "bg-[#70167E] [&_h4]:text-white [&_p]:text-white"
                    }`}
                  >
                    <div className="mx-auto mb-4 flex h-[96px] w-[96px] items-center justify-center">
                      <motion.img
                        src={s.image}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="h-[84px] w-auto object-contain"
                        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
                        transition={{
                          duration: 2.4,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: i * 0.3, // offsets each card so they don't pulse in sync
                        }}
                      />
                    </div>
                    <h4 className="mb-3 pb-sunday text-2xl text-black">{s.title}</h4>
                    <p className="mb-0">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}