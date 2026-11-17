import { useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { SITE } from "@/data/Site";
import { submitLead } from "@/lib/lead";

type Status = "idle" | "sending" | "error";

const EMPTY = { name: "", email: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THANK_YOU_URL = "/thank-you";

const input =
    "w-full rounded-full border border-brand-ink/15 bg-white px-5 h-[42px] text-[13px] text-brand-ink shadow-[0_2px_0_#25283e] outline-none transition-[box-shadow,border-color] duration-300 placeholder:text-brand-ink/50 focus:border-brand-orange/60 focus:shadow-[0_3px_0_var(--color-brand-orange)]";

export default function HeroMobileForm({ className = "" }: { className?: string }) {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (status === "sending") return;

        const name = form.name.trim();
        const email = form.email.trim();
        const phone = form.phone.trim();
        const message = form.message.trim();

        if (!name || !email || !phone || !message) {
            setStatus("error");
            setError("Please fill in all fields.");
            return;
        }
        if (!EMAIL_RE.test(email)) {
            setStatus("error");
            setError("Please enter a valid email address.");
            return;
        }

        setStatus("sending");
        setError("");
        try {
            await submitLead({ name, email, phone_number: phone, message: `[Hero Form] ${message}` });
            setForm(EMPTY);
            window.location.assign(THANK_YOU_URL);
        } catch {
            setStatus("error");
            setError("");
        }
    }

    return (
        <div
            className={`relative w-full max-w-[600px] rounded-[26px] border-[4px] border-white bg-brand-paper shadow-[0_24px_40px_-20px_rgba(16,10,40,0.55)] ${className}`}
            // stop the hero's swipe gesture from firing while using the form
            onPointerDownCapture={(e) => e.stopPropagation()}
        >
            <span className="pointer-events-none absolute inset-[4px] rounded-[20px] border-2 border-dotted border-brand-dots" />

            <form onSubmit={onSubmit} noValidate className="relative space-y-3 px-5 pb-6 pt-6">
                <div className="text-center">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-brand-plum">Free Consultation</p>
                    <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-brand-ink">Start Your Book Today</h2>
                </div>

                <input className={input} name="name" autoComplete="name" placeholder="Full Name" aria-label="Full name" value={form.name} onChange={onChange} />
                <input className={input} name="email" type="email" autoComplete="email" placeholder="Email" aria-label="Email" value={form.email} onChange={onChange} />
                <input className={input} name="phone" type="tel" autoComplete="tel" maxLength={20} placeholder="Phone Number" aria-label="Phone number" value={form.phone} onChange={onChange} />
                <textarea
                    className={`${input} h-auto min-h-[76px] resize-none rounded-[16px] py-3`}
                    name="message"
                    rows={2}
                    placeholder="Tell us about your book"
                    aria-label="Message"
                    value={form.message}
                    onChange={onChange}
                />

                {status === "error" && (
                    <p role="alert" className="rounded-xl bg-[#fde8ec] px-4 py-3 text-[12.5px] text-[#8e1f33]">
                        {error || (
                            <>
                                Your message couldn't be sent. Please try again, or email us at{" "}
                                <a href={`mailto:${SITE.email}`} className="font-bold underline">
                                    {SITE.email}
                                </a>
                                .
                            </>
                        )}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative flex h-[44px] w-full items-center justify-center overflow-hidden rounded-full bg-brand-orange text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-12px_rgba(209,129,9,0.9)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 disabled:cursor-wait disabled:opacity-80"
                >
                    <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
                    <span className="relative inline-flex items-center gap-2">
                        {status === "sending" ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending
                            </>
                        ) : (
                            <>
                                Get Started
                                <Send className="h-3.5 w-3.5" />
                            </>
                        )}
                    </span>
                </button>
            </form>
        </div>
    );
}