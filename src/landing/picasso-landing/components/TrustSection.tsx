import { Link } from "react-router-dom";

import { useModal } from "./ModalContext";
import Reveal from "./Reveal";
import {motion } from "framer-motion";
export default function TrustSection() {
  const { openModal } = useModal();
  return (
    <Reveal as="section" from="right">
      <div className="pb-glass">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <img src="/images/Blog-1.png" alt="Illustrated children’s books" width={671} height={710} className="mx-auto h-auto max-w-full rounded-xl border border-3 border-[#70167E]" />
          <div>
            <h3 className="pb-heading text-[28px] md:text-[42px]">
              Where Little<span className="text-[#70167E]"> Stories Receive Extraordinary </span> Care and Creativity 
            </h3>
            <p className="max-[576px]:text-center">
             At Toon Haus Publishing, we believe every children's story deserves more than just a place on a bookshelf. It deserves thoughtful storytelling, captivating artwork, and the kind of magic that makes young readers turn every page with wonder.
            </p>
            <p className="max-[576px]:text-center">
              That's why we give every project our creative attention, carefully refining each detail from the first illustration to the final page. Our mission is to help you create a children's book you'll be proud to share and families will love to read again and again.
            </p>
           <div className="flex flex-wrap items-center gap-[15px] max-[576px]:justify-center">
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
      </div>
    </Reveal>
  );
}
