import { Link } from "react-router-dom";

import { useModal } from "./ModalContext";
import Reveal from "./Reveal";
import StarList from "./StarList";
import {motion } from "framer-motion";

const Red = ({ children }: { children: string }) => <span className="text-[#70167E]">{children}</span>;

export default function StorySection() {
  const { openModal } = useModal();
  return (
    <Reveal as="section" from="left" className="overflow-hidden">
      <div className="relative overflow-hidden pb-glass">
        <div
          className="flex flex-col md:flex-row  gap-2 justify-center items-between rounded-[11px] bg-cover bg-center bg-no-repeat px-0 py-[17px] max-md:bg-right max-[576px]:rounded-none"
          
        >
          
          <div className="md:w-1/2">
            <div className="rounded-[10px] border-2 border-white bg-[rgba(181,181,181,.86)] p-5 min-[576px]:bg-[rgba(181,181,181,.68)] md:bg-[rgba(181,181,181,.45)] [&_p]:max-md:text-white [&_p]:max-[576px]:text-center">
              <h3 className="pb-heading text-[28px] md:text-[42px]">
                <span className="text-[#70167E]">Big Imaginations Deserve </span>
                Beautifully Published Books!
              </h3>
              <p>Every unforgettable childhood adventure begins with a story worth sharing.</p>
              <p>
                At Toon Haus Publishing, we help aspiring and experienced authors transform their creative ideas into beautifully illustrated children's books. From the first draft to the finished masterpiece, we bring together imagination, expertise, and a little publishing magic.
              </p>
              <p>Here's What We Bring to Your Publishing Journey:</p>
              <StarList
                items={[
                  <><Red>Imaginative illustrations </Red> that make every character and adventure come alive.</>,
                  <><Red>Expert editing, design, and formatting </Red>for a polished, professional storybook.</>,
                  <><Red>Stress-free self-publishing support </Red> with creative control and ownership of your work.</>,
                 
                  <><Red>Wide-reaching book distribution </Red>through platforms like Amazon, Barnes & Noble, and more.</>,
                  <><Red>Greater visibility for your book  </Red>to help your stories reach young readers around the world.</>,
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
          </div>
          <div className="md:w-1/2">
          <img src="/images/Testimonial-1.png" className="w-auto h-full rounded-md object-cover" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
