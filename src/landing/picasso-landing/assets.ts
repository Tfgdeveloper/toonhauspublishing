// All images/videos live in /public. Run download-assets.sh once to fetch them
// from your old site, or drop your own files in with the same names.
const img = (name: string) => `/picasso/images/${name}`;

export const IMAGES = {
  logo: img("logo.png"),
  star: img("star.png"),
  sec2Bg: img("Testimonial-1.png"),
  sec3: img("Testimonial-1.png"),
  slides: [img("Cover-1.png"), img("Cover-1.png"), img("Cover-1.png")],
  authors: Array.from({ length: 10 }, (_, i) => img(`sec-img${i + 1}.png`)),
  services: Array.from({ length: 6 }, (_, i) => img(`sec-6-img${i + 1}.png`)),
  sec7: [img("sec-7-img1.png"), img("sec-7-img2.png"), img("sec-7-img3.png")],
  sec8: [img("sec-8-img1.png"), img("sec-8-img2.png")],
  circles: [img("circle1.png"), img("circle2.png"), img("circle3-c.png"), img("circle4.png"), img("circle5.png")],
  vectors: [img("vec1.png"), img("vec2.png"), img("vec3.png"), img("vec4.png")],
  testimonials: [img("sec-9imh-1.png"), img("sec-9imh-2.png")],
  videoThumb: img("ved-3img.png"),
  elephant: img("elepant.png"),
  couponBadge: img("get.png"),
  bg: img("bg.png"),
};

export const VIDEOS = {
  reviews: ["/picasso/videos/laurie-video-1.mp4", "/picasso/videos/laurie-video-2.mp4", "/picasso/videos/sandra-video-2.mp4"],
  testimonial: "/picasso/videos/IMG_1995.mp4",
};

export const CONTACT = {
  phone: "(949) 828-2170",
  phoneHref: "tel:+19498282170",
  email: "support@toonhauspublishing.com",
  addresses: [
    "2913 El Camino Real, Tustin, CA 92782, United States",
    
  ],
};
