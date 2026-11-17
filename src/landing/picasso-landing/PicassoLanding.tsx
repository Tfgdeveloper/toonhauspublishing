import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import AuthorsGrid from "./components/AuthorsGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Inspire from "./components/Inspire";
import { ModalContext } from "./components/ModalContext";
import Navbar from "./components/Navbar";
import PortfolioCarousel from "./components/PortfolioCarousel";
import Process from "./components/Process";
import PromoModal from "./components/PromoModal";
import Services from "./components/Services";
import StorySection from "./components/StorySection";
import Testimonials from "./components/Testimonials";
import TrustSection from "./components/TrustSection";
import VideoReviews from "./components/VideoReviews";
import VideoTestimonial from "./components/VideoTestimonial";
import "./picasso-landing.css";

const AUTO_OPEN_MS = 20_000; // coupon popup opens after 20 seconds, like the original

export default function PicassoLanding() {
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
            <VideoTestimonial />
          </main>
          <Footer />
          <PromoModal open={modalOpen} onClose={closeModal} />
        </div>
      </ModalContext.Provider>
    </MotionConfig>
  );
}
