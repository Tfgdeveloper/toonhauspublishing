import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMAGES } from "../assets";
import { SITE } from "@/data/Site";
import { submitLead } from "@/lib/lead";

type Props = { open: boolean; onClose: () => void };
type Status = "idle" | "sending" | "error";

const EMPTY = { name: "", email: "", phone: "", project: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THANK_YOU_URL = "/thank-you";

export default function PromoModal({ open, onClose }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    setForm(EMPTY);
    setStatus("idle");
    setError("");

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstField.current?.focus(), 300);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const project = form.project.trim();

    if (!name || !email || !phone || !project) {
      setStatus("error");
      setError("Please fill in all fields to activate the coupon.");
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
      await submitLead({
        name,
        email,
        phone_number: phone,
        message: `[33% Coupon] ${project}`,
      });
      setForm(EMPTY);
      window.location.assign(THANK_YOU_URL);
    } catch {
      setStatus("error");
      setError("");
    }
  }

  const input =
    "mb-2.5 block h-[50px] w-full border-2 border-[#eaeaea] bg-white p-2.5 pb-montserrat outline-none focus:border-[#f0a821]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1060] flex items-center justify-center overflow-y-auto bg-black/50 p-2 min-[576px]:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            className="relative my-14 w-full max-w-[500px] md:max-w-[928px]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
           
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-[13px] top-[35px] z-20 flex h-6 w-6 items-center justify-center text-2xl leading-none text-black"
            >
              ×
            </button>

            <div
              className="relative isolate overflow-hidden rounded-[20px] border-[3px] border-[#f0a821] bg-cover bg-bottom p-5 shadow-[0_4px_30px_rgba(0,0,0,.1)] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[rgba(213,209,209,.65)]"
              style={{ backgroundImage: `url(${IMAGES.bg})` }}
            >
              <div className="grid items-center gap-4 md:grid-cols-2">
                <img
                  src="/images/sec-7-img3.png"
                  alt=""
                  className="mx-auto -mt-2 h-auto w-[150px] min-[576px]:w-[200px] md:w-[377px]"
                />
                <div>
                  <div className="mb-2 mt-4">
                    <h3 id="promo-title" className="pb-montserrat text-xl font-extrabold text-black">
                      Activate Your Book Publishing Coupon To Avail 33% Discount!
                    </h3>
                    <h2 className="pb-montserrat text-[26px] font-bold uppercase text-black">Limited Coupons Left</h2>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <input
                      ref={firstField}
                      className={input}
                      name="name"
                      autoComplete="name"
                      maxLength={60}
                      placeholder="Enter Your Full Name"
                      aria-label="Full name"
                      value={form.name}
                      onChange={onChange}
                    />
                    <input
                      className={input}
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter Your Email"
                      aria-label="Email"
                      value={form.email}
                      onChange={onChange}
                    />
                    <input
                      className={input}
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      maxLength={20}
                      placeholder="Phone Number"
                      aria-label="Phone number"
                      value={form.phone}
                      onChange={onChange}
                    />
                    <input
                      className={input}
                      name="project"
                      placeholder="What are you trying to Register?"
                      aria-label="What you want to publish"
                      value={form.project}
                      onChange={onChange}
                    />
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full rounded-md bg-[#edae08] px-6 py-3 pb-montserrat font-bold text-white transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "sending" ? "Sending…" : "Submit Now"}
                      </button>
                    </div>

                    {status === "error" && (
                      <div role="alert" className="mt-4 rounded border border-[#f5c2c7] bg-[#f8d7da] p-2 pb-montserrat text-[#842029]">
                        {error || (
                          <>
                            Your request couldn't be sent. Please try again, or email us at{" "}
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
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}