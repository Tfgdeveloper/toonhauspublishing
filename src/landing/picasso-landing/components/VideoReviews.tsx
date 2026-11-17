

export default function VideoReviews() {

  const Videos = [
  "/images/landing/1.mp4",
  "/images/landing/2.mp4",
  "/images/landing/3.mp4",
];

  return (
    <section>
      <div className="pb-glass">
        <div className="grid gap-4 md:grid-cols-3">
          {Videos.map((src) => (
            <video key={src} className="aspect-[4/3] w-full rounded-lg bg-black" controls autoPlay muted playsInline preload="metadata">
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </section>
  );
}
