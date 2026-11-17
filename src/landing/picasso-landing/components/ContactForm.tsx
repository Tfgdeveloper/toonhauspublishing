import { useState, type ChangeEvent, type FormEvent } from "react";
import { SITE } from "@/data/Site";
import { submitLead } from "@/lib/lead";

type Status = "idle" | "sending" | "error";

const EMPTY = { name: "", email: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THANK_YOU_URL = "/thank-you";

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name || !email || !phone || !message) {
      setStatus("error");
      setError("Please fill in your name, email, phone number and message.");
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
      await submitLead({ name, email, phone_number: phone, message });
      setForm(EMPTY);
      window.location.assign(THANK_YOU_URL);
    } catch {
      setStatus("error");
      setError("");
    }
  }

  return (
    <div className="rounded-[10px] pb-glass px-[15px] py-[37px] max-md:mt-10">
      <h3 className="mb-4 pb-sunday text-[19px] text-black max-[576px]:text-center min-[576px]:text-[30px]">
        Let’s Publish Your Children’s Book!
      </h3>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className="pb-field h-[45px]"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Full Name"
          aria-label="Full name"
          value={form.name}
          onChange={onChange}
        />
        <input
          className="pb-field h-[45px]"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          aria-label="Email address"
          value={form.email}
          onChange={onChange}
        />
        <input
          className="pb-field h-[45px]"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Phone Number"
          aria-label="Phone number"
          value={form.phone}
          onChange={onChange}
        />
        <textarea
          className="pb-field h-[140px] resize-y py-2"
          name="message"
          placeholder="Message"
          aria-label="Message"
          value={form.message}
          onChange={onChange}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-purple px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40"
        >
          <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">{status === "sending" ? "Sending…" : "Let's Talk To An Expert"}</span>
          
        </button>

        {status === "error" && (
          <div role="alert" className="mt-4 rounded border border-[#f5c2c7] bg-[#f8d7da] p-4 pb-montserrat text-[#842029]">
            {error || (
              <>
                Your message couldn't be sent. Please try again, or email us at{" "}
                <a href={`mailto:${SITE.email}`} className="font-bold underline">
                  {SITE.email}
                </a>
                .
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}