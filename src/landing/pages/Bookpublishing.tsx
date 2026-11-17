
import Services from "./components/Services";

import Trust from "./components/Trust";
import Testimonials from "./components/Testimonials";
import Illustrations from "./components/illustration";
import PortfolioSection from "./components/Portfolio";
import About from "./components/AboutUs";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function Bookpublishing() {
    return (
        <>
            <Navbar/>  
            <Hero/>
            <Services />
            <About/>
            <Trust />
            <PortfolioSection />
            <Testimonials />
            <Illustrations />
            <Footer/>
        </>
    );
}