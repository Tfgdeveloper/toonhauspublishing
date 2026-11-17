import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { PhoneCall, Sparkles } from "lucide-react";
import { useLeadModal, type LeadModalOptions } from "@/component/LeadModal/LeadModalContext";

const PHONE = "+19498282170";

const EASE = [0.22, 1, 0.36, 1] as const;

const MotionLink = motion.create(Link);

type Variant = "orange" | "plum";

const VARIANT_CLASS: Record<Variant, string> = {
    orange: "bg-brand-orange shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] focus-visible:ring-brand-orange/40",
    plum: "bg-brand-plum shadow-[0_8px_20px_-8px_rgba(112,22,126,0.7)] focus-visible:ring-brand-plum/40",
};

export function PillButton({
    children,
    className = "",
    variant = "orange",
    icon,
    href,
    title,
    subtitle,
    service,
}: LeadModalOptions & {
    children: ReactNode;
    className?: string;
    variant?: Variant;
    icon?: ReactNode;
    href?: string; // when set, renders a link (e.g. "tel:+1...") instead of opening the modal
}) {
    const { openLeadModal } = useLeadModal();

    const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white outline-none focus-visible:ring-4 sm:px-6 sm:py-3 sm:text-[12px] ${VARIANT_CLASS[variant]} ${className}`;

    const motionProps = {
        whileHover: { scale: 1.04, y: -1 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 220, damping: 20 },
    };

    const content = (
        <>
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            {icon && <span className="relative inline-flex">{icon}</span>}
            <span className="relative">{children}</span>
        </>
    );

    if (href) {
        return (
            <motion.a href={href} {...motionProps} className={classes}>
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type="button"
            onClick={() => openLeadModal({ title, subtitle, service })}
            {...motionProps}
            className={classes}
        >
            {content}
        </motion.button>
    );
}

export default function Navbar() {
    return (
        <header className="relative z-30 bg-white">
            <nav className="relative mx-auto flex h-[72px] max-w-[1140px] items-center justify-between gap-3 px-4 sm:h-[80px] sm:px-5 lg:h-[88px]">
                <MotionLink
                    to="/"
                    aria-label="Toon Haus Publishing home"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                    whileHover={{ scale: 1.03 }}
                    className="shrink-0"
                >
                    <img
                        src="/images/logo.png"
                        alt="Toon Haus Publishing"
                        className="h-[40px] w-auto min-[400px]:h-[46px] sm:h-[54px] lg:h-[60px] xl:h-[66px]"
                    />
                </MotionLink>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                    className="flex items-center gap-2 sm:gap-3"
                >
                    <PillButton
                        variant="plum"
                        href={`tel:${PHONE}`}
                        icon={<PhoneCall className="h-3.5 w-3.5" strokeWidth={2.4} />}
                        className="max-[420px]:hidden"
                    >
                        Call Us Now
                    </PillButton>

                    <PillButton
                    
                        icon={<Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />}
                        title="Start Your Project"
                    >
                        Start Your Project
                    </PillButton>
                </motion.div>
            </nav>

            <div className="scallop-edge pointer-events-none absolute inset-x-0 top-full h-[7px]" />
        </header>
    )
}