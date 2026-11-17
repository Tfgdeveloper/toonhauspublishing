import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SITE } from "@/data/Site";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

export default function ThankYou() {
    const reduceMotion = useReducedMotion();
    const navigate = useNavigate();

    // Go back one page; if the user opened this page directly (no history), go home instead
    const goBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    // Page title + keep this page out of Google results
    useEffect(() => {
        const prevTitle = document.title;
        document.title = "Thank You | Toon Haus Publishing";

        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex, nofollow";
        document.head.appendChild(robots);

        return () => {
            document.title = prevTitle;
            robots.remove();
        };
    }, []);

    return (
        <section className="relative isolate overflow-hidden bg-[#5b3a8c]">
            <motion.img
                src="/images/About-Hero-BG.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0.3 : 2.4, ease: EASE }}
                className="absolute inset-0 -z-20 h-full w-full select-none object-cover object-bottom"
                style={{ willChange: "transform" }}
            />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#5d3896]/75" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(40,18,80,0.35),transparent_65%)]" />

            <div className="mx-auto flex min-h-[70vh] max-w-[1140px] items-center justify-center px-4 py-16 sm:px-5">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex max-w-[680px] flex-col items-center text-center"
                >
                    {/* Checkmark */}
                    <motion.div
                        variants={item}
                        className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-white/90 bg-brand-orange shadow-[0_10px_22px_-10px_rgba(209,129,9,0.9)] sm:h-[84px] sm:w-[84px]"
                    >
                        <svg viewBox="0 0 24 24" className="h-9 w-9 text-white sm:h-10 sm:w-10" aria-hidden="true">
                            <motion.path
                                d="M5 12.5l4.5 4.5L19 7.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.6}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                            />
                        </svg>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="mt-6 text-[38px] font-bold leading-[1.1] text-white drop-shadow-[0_4px_18px_rgba(30,10,60,0.35)] sm:text-[52px] lg:text-[60px]"
                    >
                        Thank You!
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mt-4 max-w-[600px] text-[16px] font-medium leading-[1.9] text-white/95"
                    >
                        We’ve received your details. One of our children’s book experts will get in touch within 24 hours to talk about your story.
                    </motion.p>

                    <motion.p variants={item} className="mt-3 text-[14px] text-white/85">
                        Can’t wait? Email us at{" "}
                        <a
                            href={`mailto:${SITE.email}`}
                            className="font-bold text-white underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                            {SITE.email}
                        </a>
                    </motion.p>

                    <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <motion.button
                            type="button"
                            onClick={goBack}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-7 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-10px_rgba(209,129,9,0.9)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 sm:px-8"
                        >
                            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
                            <span className="relative">Go Back</span>
                        </motion.button>

                       
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}