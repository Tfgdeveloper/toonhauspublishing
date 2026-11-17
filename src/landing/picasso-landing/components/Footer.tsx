import { CONTACT } from "../assets";

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-[#70167E]" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ICONS = {
  mail: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z",
  phone: "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z",
  pin: "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
};

export default function Footer() {
  const linkCls = "pb-montserrat text-black no-underline hover:text-[#70167E]";
  return (
    <footer className="relative">
      <img
        src="/images/elepant.png"
        alt=""
        loading="lazy"
        className="float-up-down pointer-events-none absolute top-10 right-20 hidden h-auto w-[200px] min-[992px]:block min-[1200px]:w-[180px]"
      />
      <div className="pb-glass">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <img src="/images/logo.png" alt="Toon Haus Publishing" width={933} height={266} className="mb-4 h-auto w-[250px]" />
            <ul className="space-y-3 p-0">
              <li className="flex list-none gap-2">
                <Icon d={ICONS.mail} />
                <a href={`mailto:${CONTACT.email}`} className={linkCls}>{CONTACT.email}</a>
              </li>
              <li className="flex list-none gap-2">
                <Icon d={ICONS.phone} />
                <a href={CONTACT.phoneHref} className={linkCls}>{CONTACT.phone}</a>
              </li>
              <li className="flex list-none gap-2">
                <Icon d={ICONS.pin} />
                <address className="pb-montserrat not-italic text-black">
                  {CONTACT.addresses.map((a) => (
                    <span key={a} className="block">{a}</span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-black py-4">
        <div className="pb-container">
          <ul className="m-0 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 p-0 pb-montserrat text-sm text-white">
            <li className="list-none">Copyright © {new Date().getFullYear()}, All right reserved</li>
            <li className="list-none"><a href="/terms-and-conditions" className="text-white no-underline hover:underline">Terms Of Services</a></li>
            <li className="list-none"><a href="/privacy-policy" className="text-white no-underline hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
