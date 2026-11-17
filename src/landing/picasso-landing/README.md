# Picasso landing page – drop-in folder

Works with a Vite + React + TypeScript site that uses Tailwind v4 (`@tailwindcss/vite`).
No PostCSS, no tailwind.config, no changes to your global CSS.

## 1. Copy the folder
Put this whole `picasso-landing` folder in your project, e.g. `src/pages/picasso-landing/`.

## 2. Install Framer Motion (if you don't have it)
    npm install framer-motion

## 3. Add a route
React Router example:

    import PicassoLanding from "./pages/picasso-landing/PicassoLanding";
    <Route path="/childrens-book-publishing" element={<PicassoLanding />} />

The page has its own navbar and footer. If your routes are wrapped in a layout
with your site's header/footer, put this route outside that layout.

## 4. Download the images, font and videos
From your project root (not this folder):

    Windows:     powershell -ExecutionPolicy Bypass -File src/pages/picasso-landing/download-assets.ps1
    Mac/Linux:   bash src/pages/picasso-landing/download-assets.sh

Files go to `public/picasso/...`, so they can't clash with your own images.

## Notes
- All styles are prefixed `pb-` or scoped to `.pb-landing`, so nothing leaks into the rest of your site.
- Forms don't send anywhere yet: see the `TODO` in `components/ContactForm.tsx` and `components/PromoModal.tsx`.
