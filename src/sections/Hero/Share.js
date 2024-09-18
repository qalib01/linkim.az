import { Link } from "react-router-dom";
import classes from './Hero.module.css'
import SectionLayout from "../Root/SectionLayout";

function ShareSection() {
    return (
        <SectionLayout sectionName='hero' sectionBg='bgSkyBlue'>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6 order-1 order-lg-1 mt-4 mt-lg-0 pt-4 pt-lg-0">
                    <div className={`${classes.content} pe-md-0 pe-lg-5`}>
                        <h3 className={`${classes.title} mt-3`}> Linklərinizi daha rahat paylaşın </h3>
                        <p className={`mt-3 mb-0`}> Bütün linklərinizi linkim.az platformasından qeydiyyatdan keçirin, sosial şəbəkələrinizin bio hissəsinə əlavə edin və rahatlıqdan faydalanın. </p>
                        <Link to="/register"> İndi başla </Link>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 order-2 order-lg-2">
                    {/* <div className={`${classes.heroImage} wings position-relative mx-3 mx-md-4 ms-lg-5`}>
                        <img className="rounded img-fluid w-100 position-relative" src="assets/images/hero.jpg" alt="Hero" />
                    </div> */}
                </div>
            </div>
        </SectionLayout>
    )
}

export default ShareSection;