import { useEffect } from "react";
import About from "../../sections/About/About";

function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <About />
    )
}

export default AboutPage;