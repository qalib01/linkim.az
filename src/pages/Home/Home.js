import Faqs from "../../sections/Faq/Faqs";
import CustomizeSection from "../../sections/Hero/Customize";
import HeroSection from "../../sections/Hero/Hero";
import ShareSection from "../../sections/Hero/Share";
import Services from "../../sections/Services/Services";
import Instructions from "../../sections/Instructions/Instructions";
import { useEffect } from "react";

function HomePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <HeroSection />
            <CustomizeSection />
            <ShareSection />
            <Instructions />
            <Services />
            <Faqs />
        </>
    )
}

export default HomePage;