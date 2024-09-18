import { Link } from "react-router-dom";
import classes from './Hero.module.css'
import SectionLayout from "../Root/SectionLayout";

function HeroSection() {
    return (
        <SectionLayout sectionName='hero' sectionBg='bgPastelGreen'>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6 order-1 order-lg-1 mt-4 mt-lg-0 pt-4 pt-lg-0">
                    <div className={`${classes.content} pe-md-0 pe-lg-5`}>
                        <h1 className={`${classes.title} mt-3`}> Bütün linklər <br className="d-none d-lg-block" /> indi sadəcə <span className="text-warning"> 1 </span> yerdə </h1>
                        <p className={`mt-3 mb-0`}> İndi siz də bizim inkişaf etməkdə olan platformamıza qoşularaq bütün Facebook, Instagram, Tiktok, X və digər linklərinizi sadəcə bir link üzərindən paylaşın. </p>
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

export default HeroSection;