import Portfolio from "@/component/PortfolioPage/Portfolio";
import PortfolioPartners from "@/component/PortfolioPage/Portfolio-Partners";
import PortfolioHero from "@/component/PortfolioPage/PortfolioHero";
import PortfolioIllustrations from "@/component/PortfolioPage/Portfolioillustration";

export default function PortfolioPage() {
    return (
        <>
        <title>Our Portfolio | Children’s Book Projects by Toon Haus</title>
          <PortfolioHero />
          <Portfolio />
          <PortfolioPartners />
          <PortfolioIllustrations />
        </>
    );
}