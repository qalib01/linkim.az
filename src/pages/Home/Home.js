import Faq from "../../sections/Faq/Faq";
import CustomizeSection from "../../sections/Hero/Customize";
import HeroSection from "../../sections/Hero/Hero";
import ShareSection from "../../sections/Hero/Share";
import ServicesSection from "../../sections/Services/Services";

function HomePage() {
    return (
        <>
            <HeroSection />
            <CustomizeSection />
            <ShareSection />
            <ServicesSection />
            <Faq />
        </>
    )
}

export default HomePage;