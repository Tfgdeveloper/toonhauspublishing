import Reveal from "./Reveal";

const DEFAULT_AUTHORS = [
"/images/Cover-1.png",
  "/images/Cover-2.png",
  "/images/Cover-3.png",
  "/images/Cover-4.png",
  "/images/Cover-5.png",
  "/images/Cover-6.png",
  "/images/Cover-7.png",
  "/images/Cover-8.png",
  "/images/Cover-9.png",
  "/images/Cover-10.png",
];

type Props = {
  images?: string[];
};

export default function AuthorsGrid({ images = DEFAULT_AUTHORS }: Props) {
  if (!images.length) return null;

  return (
    // overflow-x-clip stops the slide-in animation from creating a horizontal scrollbar
    <div className="w-full overflow-x-clip">
      <Reveal as="section" from="right">
        <div className="pb-glass">
          <h3 className="pb-heading text-center text-[28px] md:text-[42px]">
            <span className="text-[#70167E]">
              Every Great Children's Book Begins with a Dream. Yours Could Be Next!
            </span>
          </h3>

          <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-md min-[576px]:grid-cols-3 md:grid-cols-5">
            {images.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-square overflow-hidden border border-black/10 bg-white"
              >
                <img
                  src={src}
                  alt={`Book cover by published author ${i + 1}`}
                  width={236}
                  height={238}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* soft inner shading so each cover reads as a separate book */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_-12px_24px_-12px_rgba(0,0,0,0.35)]"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}