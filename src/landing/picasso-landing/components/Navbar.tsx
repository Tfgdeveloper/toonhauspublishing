import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT  } from "../assets";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="pb-container mt-10">
        <nav className="flex flex-wrap items-center justify-between py-2">
          <a href="#" className="py-[5px]">
            <img src="/images/logo.png" alt="Toon Haus Publishing" width={933} height={266} className="h-auto w-[191px]" />
          </a>

          <button
            type="button"
            className="rounded border border-black/10 px-3 py-1 lg:hidden"
            aria-controls="main-nav"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 30 30" className="h-6 w-6" aria-hidden="true">
              <path stroke="rgba(0,0,0,.55)" strokeLinecap="round" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22" />
            </svg>
          </button>

          

          {/* Desktop */}
          <div className="hidden px-[35px] pt-2.5 min-[992px]:block">
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
          </div>

          {/* Mobile */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="main-nav"
                className="basis-full overflow-hidden min-[992px]:hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-end px-[35px] py-2.5">
                  <a href={CONTACT.phoneHref} className="pb-btn-red">Call Now</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
