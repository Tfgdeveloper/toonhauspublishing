import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/component/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About/page";
import Portfolio from "@/pages/PortfolioPage/page";
import Contact from "./pages/Contactus/page";
import Services from "./pages/Services/page";
import Reviews from "./component/Reviews/reviews";
import ServiceDetail from "./pages/InnerServices/ServiceDetail/page";
import { PrivacyPolicyPage, RefundPolicyPage, TermsAndConditionsPage } from "./pages/legal/LegalPage";
import Bookillustration from "./landing/pages/Bookillustration";
import Bookpublishing from "./landing/pages/Bookpublishing";
import ThankYou from "./pages/Thankyou";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="reviews" element={<Reviews />} />
        
        <Route path="services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/thank-you" element={<ThankYou/>} />
        
      </Route>
      <Route path="/book-illustration" element={<Bookillustration/>} />
      <Route path="/book-publishing" element={<Bookpublishing/>} />
    </Routes>
  );
}