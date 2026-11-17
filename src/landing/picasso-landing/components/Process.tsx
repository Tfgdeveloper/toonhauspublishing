import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const RED = "#70167E";

type Step = {
  title: string;
  text: string;
  numberImage: string; // the "step 01" circle graphic
  red: boolean;
};

const STEPS: Step[] = [
  {
    title: "Perfect Your Manuscript",
    text: "Every great adventure begins with the right words! Our editors carefully refine your story, polishing grammar, clarity, and flow while keeping your unique voice and imagination intact.",
    numberImage: "/images/landing/1.png",
    red: true,
  },
  {
    title: "Format Every Page Beautifully",
    text: "We transform your manuscript into a professionally formatted book, ensuring every page looks inviting, reads effortlessly, and meets publishing standards.",
    numberImage: "/images/landing/2.png",
    red: false,
  },
  {
    title: "Publish and Share Your Story",
    text: "It's time for your story to meet the world! We help prepare your finished book for publication, turning your creative dream into something young readers can hold and cherish.",
    numberImage: "/images/landing/3.png",
    red: true,
  },
  {
    title: "Add a Splash of Illustration Magic",
    text: "Our creative illustrators bring your characters, settings, and adventures to life with colorful artwork and delightful designs that capture young imaginations.",
    numberImage: "/images/landing/4.png",
    red: false,
  },
  {
    title: "Review, Approve, and Celebrate!",
    text: "Before your book is finalized, you get the opportunity to review every detail, request refinements, and give your approval so your story shines exactly as you envisioned.",
    numberImage: "/images/landing/5.png",
    red: true,
  },
];


function StepCard({ step, index }: { step: Step; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal
  from={index % 2 === 0 ? "left" : "right"}
  delay={index * 0.1}
  className="relative w-full md:w-[calc(50%-12px)]"
>
      <div className="relative pt-[52px]">
        {/* Step number image, overlapping the top edge of the card */}
        <motion.img
          src={step.numberImage}
          alt={`Step ${index + 1}`}
          loading="lazy"
          draggable={false}
          className="absolute left-1/2 top-0 z-10 h-auto w-[104px] -translate-x-1/2 drop-shadow-[0_8px_14px_rgba(0,0,0,0.25)]"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, delay: index * 0.25 }}
        />

        <div
          className="relative h-full rounded-[18px] px-5 pb-6 pt-[64px] text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
          style={{ backgroundColor: step.red ? RED : "#ffffff" }}
        >
          {/* dashed inner border */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-[6px] rounded-[13px] border-[1.5px] border-dashed ${
              step.red ? "border-white/70" : "border-[#70167E]/50"
            }`}
          />

          <h3
            className={`relative mx-auto inline-block rounded-md px-4 py-1.5 text-[15px] font-bold leading-tight ${
              step.red ? "bg-white/15 text-white ring-1 ring-white/40" : "text-white"
            }`}
            style={step.red ? undefined : { backgroundColor: RED }}
          >
            {step.title}
          </h3>

          <p className={`relative mb-0 mt-3 text-[13px] leading-[1.65] ${step.red ? "text-white/90" : "text-[#3b2a2e]"}`}>
            {step.text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}


export default function Process() {
  return (
    <div className="w-full overflow-x-clip">
      <Reveal as="section" from="left">
        <div className="pb-glass relative">
          <h3 className="pb-heading text-center text-[28px] md:text-[42px]">
            <span style={{ color: RED }}>Five Simple Steps to Bring Your Children's Book to Life</span>
          </h3>

          {/* Zig-zag on a 10-column grid: 4 | 2 | 4, then 3 | 4 | 3, then 4 | 2 | 4 */}
          <div className="mx-auto mt-8 flex max-w-full flex-wrap justify-center gap-x-6 gap-y-8 max-md:max-w-[420px]">
            {STEPS.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>

          {/* Optional mascot in the bottom-left corner, like the eagle in the screenshot */}
          <img
            src="/images/process/mascot.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute bottom-0 left-0 hidden w-[120px] lg:block xl:w-[150px]"
          />
        </div>
      </Reveal>
    </div>
  );
}