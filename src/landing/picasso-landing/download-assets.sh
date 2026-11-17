#!/usr/bin/env bash
# Downloads your images, font and videos from the old site into /public.
# Run once from the project root:  bash download-assets.sh
set -u
IMG_BASE="https://cdn-ilfaeoe.nitrocdn.com/aIaTfpaBatvUKEkELXyIYEYybprlFxfK/assets/images/optimized/rev-4854967/picassobookpublisher.com/childrens-book-publishing/images"
SITE="https://picassobookpublisher.com/childrens-book-publishing/images"

mkdir -p public/picasso/images public/picasso/fonts public/picasso/videos

images=(bg.png star.png sec-2-bg.png sec-3-img.png slide1.png slide2.png slide3.png
  sec-img1.png sec-img2.png sec-img3.png sec-img4.png sec-img5.png sec-img6.png sec-img7.png sec-img8.png sec-img9.png sec-img10.png
  sec-6-img1.png sec-6-img2.png sec-6-img3.png sec-6-img4.png sec-6-img5.png sec-6-img6.png
  sec-7-img1.png sec-7-img2.png sec-7-img3.png sec-8-img1.png sec-8-img2.png
  circle1.png circle2.png circle3-c.png circle4.png circle5.png vec1.png vec2.png vec3.png vec4.png
  sec-9imh-1.png sec-9imh-2.png ved-3img.png elepant.png get.png)

for f in "${images[@]}"; do
  curl -fsSL "$IMG_BASE/$f" -o "public/picasso/images/$f" || curl -fsSL "$SITE/$f" -o "public/picasso/images/$f" || echo "FAILED: $f"
done

curl -fsSL "https://cdn-ilfaeoe.nitrocdn.com/aIaTfpaBatvUKEkELXyIYEYybprlFxfK/assets/images/optimized/rev-4854967/picassobookpublisher.com/new_assets/img/logo.png" -o public/picasso/images/logo.png || echo "FAILED: logo.png"
curl -fsSL "https://picassobookpublisher.com/images/favicon.png" -o public/picasso/images/favicon.png || echo "FAILED: favicon.png"
curl -fsSL "https://cdn-ilfaeoe.nitrocdn.com/aIaTfpaBatvUKEkELXyIYEYybprlFxfK/assets/static/source/rev-ff62e65/picassobookpublisher.com/childrens-book-publishing/fonts/Sundayshine.otf" -o public/picasso/fonts/Sundayshine.otf || echo "FAILED: Sundayshine.otf"

for v in laurie-video-1.mp4 laurie-video-2.mp4 sandra-video-2.mp4 IMG_1995.mp4; do
  curl -fsSL "$SITE/$v" -o "public/picasso/videos/$v" || echo "FAILED: $v"
done

echo "Done."
