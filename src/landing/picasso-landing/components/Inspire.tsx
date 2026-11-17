
import { Link } from "react-router-dom";
import { useModal } from "./ModalContext";
import Reveal from "./Reveal";
import {motion } from "framer-motion";

export default function Inspire() {
  const { openModal } = useModal();
  return (
    <Reveal as="section" from="right">
      <div className="pb-glass relative overflow-hidden">
        <div className="flex items-end justify-between gap-4">
          <img src="/images/sec-7-img2.png" alt="" loading="lazy" className="float-left-right absolute bottom-0 -left-5 h-auto w-[90px] min-[576px]:w-[280px]" />
          
          <img src="/images/sec-7-img3.png" alt="" loading="lazy" className="float-up-down absolute bottom-0 right-0 h-auto w-[80px] min-[576px]:w-[170px]" />
        </div>
        <div className="mx-auto mt-4 max-w-3xl text-center">
          <h3 className="pb-heading text-center text-[28px] md:text-[42px]">
            <span className="text-[#70167E]">Create a Story Today That Little Hearts Will Treasure Forever!</span>
          </h3>
          <p >
            Every child deserves a story that makes them dream bigger, laugh louder, and discover something wonderful. Your imagination could be the beginning of their next favorite adventure! At Toon Haus Publishing, we help transform your creative vision into a beautifully crafted children's book that inspires curiosity, celebrates imagination, and creates memories that last a lifetime.
          </p>
          <div className="mx-auto flex flex-wrap items-center gap-[15px] justify-center">
              <Link to="tel:+19498282170">
            <motion.button
            type="button"
            
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 "
        >
          <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">Talk to an Expert</span>
        </motion.button>
              </Link>
              
            <motion.button
            type="button"
            onClick={openModal}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-purple px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 "
        >
          <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">Bring My Story to Life</span>
        </motion.button>
             
              
            </div>
        </div>
      </div>
    </Reveal>
  );
}
