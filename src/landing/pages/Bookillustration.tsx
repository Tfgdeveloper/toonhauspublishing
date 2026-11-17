import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

import "../picasso-landing/picasso-landing.css";
import { ModalContext } from "../picasso-landing/components/ModalContext";
import Navbar from "../picasso-landing/components/Navbar";
import Hero from "../picasso-landing/components/Hero";
import StorySection from "../picasso-landing/components/StorySection";
import TrustSection from "../picasso-landing/components/TrustSection";
import PortfolioCarousel from "../picasso-landing/components/PortfolioCarousel";
import AuthorsGrid from "../picasso-landing/components/AuthorsGrid";
import VideoReviews from "../picasso-landing/components/VideoReviews";
import Services from "../picasso-landing/components/Services";
import Inspire from "../picasso-landing/components/Inspire";
import Process from "../picasso-landing/components/Process";
import Testimonials from "../picasso-landing/components/Testimonials";
import Footer from "../picasso-landing/components/Footer";
import PromoModal from "../picasso-landing/components/PromoModal";

const AUTO_OPEN_MS = 20_000; // coupon popup opens after 20 seconds, like the original

export default function Bookillustration() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Children's Book Publishing | Toon Haus Publishing";
    const id = setTimeout(openModal, AUTO_OPEN_MS);
    return () => {
      clearTimeout(id);
      document.title = prevTitle;
    };
  }, [openModal]);

  return (
    <MotionConfig reducedMotion="user">
      <ModalContext.Provider value={{ openModal }}>
        <div className="pb-landing">
          <Navbar />
          <main>
            <Hero />
            <StorySection />
            <TrustSection />
            <PortfolioCarousel />
            <AuthorsGrid />
            <VideoReviews />
            <Services />
            <Inspire />
            <Process />
            <Testimonials />
          </main>
          <Footer />
          <PromoModal open={modalOpen} onClose={closeModal} />
        </div>
      </ModalContext.Provider>
    </MotionConfig>
  );
}
