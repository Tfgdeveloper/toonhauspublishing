# Windows version of download-assets.sh (Mac/Linux)
# Run from the project folder in PowerShell:  powershell -ExecutionPolicy Bypass -File download-assets.ps1
$ImgBase = "https://cdn-ilfaeoe.nitrocdn.com/aIaTfpaBatvUKEkELXyIYEYybprlFxfK/assets/images/optimized/rev-4854967/picassobookpublisher.com/childrens-book-publishing/images"
$Site    = "https://picassobookpublisher.com/childrens-book-publishing/images"

New-Item -ItemType Directory -Force -Path "public/picasso/images","public/picasso/fonts","public/picasso/videos" | Out-Null

function Get-File($urls, $out) {
  foreach ($u in $urls) {
    try { Invoke-WebRequest -Uri $u -OutFile $out -UseBasicParsing -ErrorAction Stop; Write-Host "OK      $out"; return }
    catch { }
  }
  Write-Host "FAILED  $out" -ForegroundColor Red
}

$images = @("bg.png","star.png","sec-2-bg.png","sec-3-img.png","slide1.png","slide2.png","slide3.png",
  "sec-img1.png","sec-img2.png","sec-img3.png","sec-img4.png","sec-img5.png","sec-img6.png","sec-img7.png","sec-img8.png","sec-img9.png","sec-img10.png",
  "sec-6-img1.png","sec-6-img2.png","sec-6-img3.png","sec-6-img4.png","sec-6-img5.png","sec-6-img6.png",
  "sec-7-img1.png","sec-7-img2.png","sec-7-img3.png","sec-8-img1.png","sec-8-img2.png",
  "circle1.png","circle2.png","circle3-c.png","circle4.png","circle5.png","vec1.png","vec2.png","vec3.png","vec4.png",
  "sec-9imh-1.png","sec-9imh-2.png","ved-3img.png","elepant.png","get.png")

foreach ($f in $images) { Get-File @("$ImgBase/$f", "$Site/$f") "public/picasso/images/$f" }

Get-File @("https://cdn-ilfaeoe.nitrocdn.com/aIaTfpaBatvUKEkELXyIYEYybprlFxfK/assets/images/optimized/rev-4854967/picassobookpublisher.com/new_assets/img/logo.png") "public/picasso/images/logo.png"
Get-File @("https://picassobookpublisher.com/images/favicon.png") "public/picasso/images/favicon.png"
Get-File @("https://cdn-ilfaeoe.nitrocdn.com/aIaTfpaBatvUKEkELXyIYEYybprlFxfK/assets/static/source/rev-ff62e65/picassobookpublisher.com/childrens-book-publishing/fonts/Sundayshine.otf") "public/picasso/fonts/Sundayshine.otf"

foreach ($v in @("laurie-video-1.mp4","laurie-video-2.mp4","sandra-video-2.mp4","IMG_1995.mp4")) {
  Get-File @("$Site/$v") "public/picasso/videos/$v"
}
Write-Host "Done."
