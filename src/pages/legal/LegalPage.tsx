import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
    COMPANY,
    LEGAL_DOCUMENTS,
    LEGAL_ORDER,
    type LegalBlock,
    type LegalDocument,
    type LegalSlug,
} from "../../data/Data";

/* --------------------------------------------------------------- tokens
   Swap these for your shared EASE / PILL / HERO_FOCUS constants if you
   already export them from the reviews page. */

const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_FOCUS =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night";
const PAPER_FOCUS =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper";
const PRIMARY_PILL =
    "inline-flex items-center justify-center rounded-full bg-brand-orange font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-colors hover:brightness-110";

/* ---------------------------------------------------------------- utils */

const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", opts);

const isPlaceholder = (v: string) => v.startsWith("[");

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-15% 0px -70% 0px" }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);
    return active;
}

/* ---------------------------------------------------------------- icons */

function DocIcon({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
            <path d="M14 3v5h5M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ----------------------------------------------------------- hero cards */

/* ----------------------------------------------------------------- hero */

function LegalHero({ doc }: { doc: LegalDocument }) {
    const reduce = useReducedMotion();
    const item: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 26 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };
    const reduceMotion = useReducedMotion();
    return (
        <>
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

            <div className="mx-auto flex min-h-[340px] max-w-[1140px] items-center justify-center px-4 py-14 sm:min-h-[380px] sm:px-5 lg:min-h-[clamp(400px,32vw,520px)]">
                <motion.div
                    variants={item}
                    initial=""
                    animate="show"
                    className="flex max-w-[760px] flex-col items-center text-center"
                >
                    
                    <motion.p
                        variants={item}
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm text-white backdrop-blur"
                    >
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-orange text-white">
                            <DocIcon />
                        </span>
                        <span className="font-semibold">
                            {doc.title} · Effective{" "}
                            <time dateTime={doc.effectiveDate}>
                                {formatDate(doc.effectiveDate, { month: "long", day: "numeric", year: "numeric" })}
                            </time>
                        </span>
                    </motion.p>

                    <motion.h1 variants={item} className="mt-7 text-[clamp(32px,6vw,54px)] font-extrabold leading-[1.08] tracking-tight text-white">
                        {doc.headline.lead}
                        <span className="">{doc.headline.accent}</span>
                    </motion.h1>

                    <motion.p variants={item} className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-lg">
                        {doc.summary}
                    </motion.p>

                    <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <motion.a
                            href="#policy"
                            whileHover={reduce ? undefined : { y: -3 }}
                            whileTap={reduce ? undefined : { scale: 0.97 }}
                            className={`${PRIMARY_PILL} h-14 px-8 text-[13px] ${HERO_FOCUS}`}
                        >
                            Read the {doc.title.toLowerCase()}
                        </motion.a>
                        <motion.a
                            href={`#${doc.sections[doc.sections.length - 1].id}`}
                            whileHover={reduce ? undefined : { y: -3 }}
                            whileTap={reduce ? undefined : { scale: 0.97 }}
                            className={`inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 px-8 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-brand-ink ${HERO_FOCUS}`}
                        >
                            Contact our team
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
        </>
    );
}

/* ------------------------------------------------------- content blocks */

function ContactCard() {
    const rows: { k: string; v: string; href?: string }[] = [
        { k: "Company", v: COMPANY.name },
        { k: "Email", v: COMPANY.email, href: isPlaceholder(COMPANY.email) ? undefined : `mailto:${COMPANY.email}` },
        { k: "Phone", v: COMPANY.phone, href: isPlaceholder(COMPANY.phone) ? undefined : `tel:${COMPANY.phone.replace(/\s+/g, "")}` },
        { k: "Business address", v: COMPANY.address },
        { k: "Website", v: COMPANY.website, href: isPlaceholder(COMPANY.website) ? undefined : COMPANY.website },
    ];
    return (
        <dl className="relative my-6 grid gap-x-8 gap-y-4 overflow-hidden rounded-3xl bg-brand-night p-7 text-white sm:grid-cols-2 sm:p-8">
            <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-plum/60"
                style={{ filter: "blur(80px)" }}
            />
            {rows.map((r) => (
                <div key={r.k} className="relative">
                    <dt className="text-sm text-white/55">{r.k}</dt>
                    <dd className="mt-1 break-words font-semibold">
                        {r.href ? (
                            <a href={r.href} className={`underline-offset-4 hover:text-brand-orange hover:underline ${HERO_FOCUS}`}>
                                {r.v}
                            </a>
                        ) : (
                            r.v
                        )}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

function Block({ block }: { block: LegalBlock }) {
    switch (block.type) {
        case "p":
            return <p className="mt-4 text-[16px] leading-[1.75] text-brand-ink/80">{block.text}</p>;
        case "link":
            return (
                <p className="mt-4 text-[16px] leading-[1.75] text-brand-ink/80">
                    {block.text}{" "}
                    <Link
                        to={block.href}
                        className={`font-semibold text-brand-plum underline decoration-brand-orange decoration-2 underline-offset-4 hover:text-brand-orange ${PAPER_FOCUS}`}
                    >
                        {block.label}
                    </Link>
                    .
                </p>
            );
        case "list":
            return (
                <ul className="mt-4 space-y-3">
                    {block.items.map((it, i) => (
                        <li key={i} className="relative pl-6 text-[16px] leading-[1.7] text-brand-ink/80">
                            <span className="absolute left-0 top-[0.7em] h-2 w-2 -translate-y-1/2 rounded-full bg-brand-orange" aria-hidden="true" />
                            {it.label && <strong className="font-bold text-brand-ink">{it.label}: </strong>}
                            {it.text}
                        </li>
                    ))}
                </ul>
            );
        case "contact":
            return <ContactCard />;
    }
}

/* ------------------------------------------------------ table of contents */

function TableOfContents({ doc, active }: { doc: LegalDocument; active: string }) {
    return (
        <nav aria-label={`${doc.title} sections`}>
            <p className="text-sm font-bold text-brand-ink">On this page</p>
            <ol className="mt-4 space-y-1 border-l-2 border-brand-ink/10">
                {doc.sections.map((s, i) => {
                    const isActive = s.id === active;
                    return (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                aria-current={isActive ? "location" : undefined}
                                className={`-ml-[2px] flex gap-2.5 border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${PAPER_FOCUS} ${
                                    isActive
                                        ? "border-brand-orange font-semibold text-brand-ink"
                                        : "border-transparent text-brand-ink/55 hover:text-brand-ink"
                                }`}
                            >
                                <span className="w-5 shrink-0 tabular-nums">{i + 1}.</span>
                                {s.title}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function RelatedPolicies({ current }: { current: LegalSlug }) {
    return (
        <nav aria-label="Legal pages" className="mt-10 border-t border-brand-ink/10 pt-6">
            <p className="text-sm font-bold text-brand-ink">Legal pages</p>
            <ul className="mt-3 space-y-1">
                {LEGAL_ORDER.map((slug) => {
                    const d = LEGAL_DOCUMENTS[slug];
                    const isCurrent = slug === current;
                    return (
                        <li key={slug}>
                            <Link
                                to={d.href}
                                aria-current={isCurrent ? "page" : undefined}
                                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${PAPER_FOCUS} ${
                                    isCurrent ? "bg-brand-plum/10 font-semibold text-brand-plum" : "text-brand-ink/65 hover:text-brand-ink"
                                }`}
                            >
                                <DocIcon className="h-4 w-4 shrink-0" />
                                {d.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/* ------------------------------------------------------------------ page */

export default function LegalPage({ slug }: { slug: LegalSlug }) {
    const doc = LEGAL_DOCUMENTS[slug];
    const ids = useMemo(() => doc.sections.map((s) => s.id), [doc]);
    const active = useActiveSection(ids);

    // No framework metadata in plain React, so set the tab title here.
    useEffect(() => {
        const previous = document.title;
        document.title = `${doc.title} | ${COMPANY.name}`;
        return () => {
            document.title = previous;
        };
    }, [doc]);

    // Start each policy at the top, unless the URL points at a section.
    useEffect(() => {
        const id = window.location.hash.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
    }, [slug]);

    return (
        <main className="bg-brand-paper">
            <LegalHero doc={doc} />

            <section id="policy" className="scroll-mt-6 px-5 py-16 sm:px-8 lg:py-24">
                <div className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
                    {/* Mobile: collapsible contents */}
                    <details className="rounded-2xl border border-brand-ink/10 bg-white p-5 lg:hidden">
                        <summary className={`cursor-pointer text-sm font-bold text-brand-ink ${PAPER_FOCUS}`}>
                            Jump to a section ({doc.sections.length})
                        </summary>
                        <div className="mt-4">
                            <TableOfContents doc={doc} active={active} />
                        </div>
                    </details>

                    {/* Desktop: sticky contents */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pb-6 pr-2">
                            <TableOfContents doc={doc} active={active} />
                            <RelatedPolicies current={doc.slug} />
                        </div>
                    </aside>

                    <article className="min-w-0 max-w-[72ch]">
                        {doc.sections.map((s, i) => (
                            <section
                                key={s.id}
                                id={s.id}
                                aria-labelledby={`${s.id}-title`}
                                className="scroll-mt-8 border-t border-brand-ink/10 py-10 first:border-t-0 first:pt-0"
                            >
                                <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-2xl font-extrabold tracking-tight text-brand-ink sm:text-[28px]">
                                    <span className="tabular-nums text-brand-plum">{i + 1}.</span>
                                    {s.title}
                                </h2>
                                {s.blocks.map((b, j) => (
                                    <Block key={j} block={b} />
                                ))}
                            </section>
                        ))}

                        <div className="lg:hidden">
                            <RelatedPolicies current={doc.slug} />
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

/* ------------------------------------------------------- page exports */

export const PrivacyPolicyPage = () => <LegalPage slug="privacy-policy" />;
export const TermsAndConditionsPage = () => <LegalPage slug="terms-and-conditions" />;
export const RefundPolicyPage = () => <LegalPage slug="refund-policy" />;