import { Link } from "react-router-dom";

import ContactForm from "./ContactForm";
import { useModal } from "./ModalContext";
import StarList from "./StarList";
import {motion } from "framer-motion";

export default function Hero() {
  const { openModal } = useModal();
  return (
    <section>
      <div className="pb-glass">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h1 className="pb-heading">
              Turn Your Children's Story Into a  <span className="text-[#70167E]">Magical Book They'll Treasure!</span>
            </h1>
            <p className="max-[576px]:text-center">
              At Toon Haus Publishing, we bring little stories to life with big imagination! From colorful illustrations to beautifully crafted books, we make your publishing journey simple, exciting, and unforgettable.
            </p>
            <h4 className="mb-[22px] pb-sunday text-[26px] text-black">Here's How We'll Bring Your Story to Life:</h4>
            <StarList
              twoColumns
              items={[
                "Shape your story with creativity, care, and expert guidance.",
                "Create enchanting illustrations that spark young imaginations.",
                "Make publishing simple, seamless, and stress-free.",
                "Design captivating books that little readers adore.",
                "Turn your dream into a storybook families will cherish.",
              ]}
            />
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
            <span className="relative">Get Started Now</span>
        </motion.button>
             
              
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
