import Hero from "@/component/Hero";
import Services from "@/component/Services";
import About from "@/component/AboutUs";
import Trust from "@/component/Trust";
import Testimonials from "@/component/Testimonials";
import Illustrations from "@/component/illustration";
import PortfolioSection from "@/component/Portfolio";

export default function Home() {
    return (
        <>
        <title>  Toon Haus Publishing | Children’s Book Publishing Services</title>
            <Hero />
            <Services />
            <About />
            <Trust />
            <PortfolioSection />
            <Testimonials />
            <Illustrations />
        </>
    );
}