import { useEffect } from "react";
import Faqs from "../Faqs/Faqs";
import Section from "../../../components/Section/Section";
import { Link } from "react-router-dom";
import classes from './Home.module.scss'
import RegisterIconSvg from "../../../components/Icons/RegisterIconSvg";
import LinkIconSvg from "../../../components/Icons/LinkIconSvg";
import ShareIconSvg from "../../../components/Icons/ShareIconSvg";
import TimeIconSvg from "../../../components/Icons/TimeIconSvg";

function HomePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Hero />
            <Customize />
            <Share />
            <Instructions />
            <Faqs />
        </>
    )
}


function Hero() {
    return (
        <Section sectionName='hero' sectionBg='bgPastelGreen'>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6 order-1 mt-4 mt-lg-0 pt-4 pt-lg-0">
                    <div className={`content pe-md-0 pe-lg-5`}>
                        <h1 className={`title mt-3`}> Bütün linklər indi sadəcə 1 yerdə </h1>
                        <p className={`mt-3 mb-0`}> İndi sən də bizim inkişaf etməkdə olan platformamıza qoşularaq bütün Facebook, Instagram, Tiktok, X və digər linklərini sadəcə bir link üzərindən paylaş </p>
                        <Link to="/p/register"> İndi başla </Link>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 order-2">
                    {/* <div className={`${classes.heroImage} wings position-relative mx-3 mx-md-4 ms-lg-5`}>
                        <img className="rounded img-fluid w-100 position-relative" src="assets/images/hero.jpg" alt="Hero" />
                    </div> */}
                </div>
            </div>
        </Section>
    )
}


function Customize() {
    return (
        <Section sectionName='customize' sectionBg='bgElectricViolet'>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6 order-2 mt-4 mt-lg-0 pt-4 pt-lg-0">
                    <div className={`content pe-md-0 pe-lg-5`}>
                        <h2 className={`title mt-3`}> Linkini dəqiqələr içində yarat </h2>
                        <p className={`mt-3 mb-0`}> Tiktok, Instagram, X, web sayt, mağaza, canlı yayım, musiqi və daha çoxunu 1 linkdə topla və paylaş </p>
                        <Link to="/p/register"> İndi başla </Link>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 order-1">
                    {/* <div className={`${classes.customizeImage} wings position-relative mx-3 mx-md-4 ms-lg-5`}>
                        <img className="rounded img-fluid w-100 position-relative" src="assets/images/customize.jpg" alt="Customize" />
                    </div> */}
                </div>
            </div>
        </Section>
    )
}


function Share() {
    return (
        <Section sectionName='hero' sectionBg='bgSkyBlue'>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6 order-1 mt-4 mt-lg-0 pt-4 pt-lg-0">
                    <div className={`content pe-md-0 pe-lg-5`}>
                        <h3 className={`title mt-3`}> Linklərini daha rahat paylaş </h3>
                        <p className={`mt-3 mb-0`}> Bütün linklərini linkim.az platformasından qeydiyyatdan keçir, sosial şəbəkələrinin bio hissəsinə əlavə et və rahatlıqdan faydalan </p>
                        <Link to="/p/register"> İndi başla </Link>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 order-2">
                    {/* <div className={`${classes.heroImage} wings position-relative mx-3 mx-md-4 ms-lg-5`}>
                        <img className="rounded img-fluid w-100 position-relative" src="assets/images/hero.jpg" alt="Hero" />
                    </div> */}
                </div>
            </div>
        </Section>
    )
}


function Instructions() {
    return (
        <Section sectionName='instructions' sectionBg='bgTransparent'>
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className={classes.instructionsBoxText}>
                        <h4 className={`title mt-3 mb-4`}>Bir neçə dəqiqəyə yarat və paylaş</h4>
                        <p>LinkimAz ilə şəxsi və sosial media hesablarını tək bir platformada birləşdirmək çox asandır. Bir neçə sadə addımla bütün əlaqələrini idarə edə və izləyicilərinə bir kliklə təqdim edə bilərsən.</p>
                        <p>Ən sevdiyin sosial media platformalarını bir araya gətirərək, izləyicilərin və dostların üçün aydın və rahat keçid nöqtəsi yaradacaqsan. İndi addım-addım öz linkini hazırla və paylaş!</p>
                        <div className={classes.instructionsBoxLink}>
                            <Link to="/p/register"> İndi başla </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="text-center ps-0 ps-lg-5">
                        <div className="row gx-3">
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <RegisterIconSvg />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Qeydiyyatdan keç</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>10 saniyə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <LinkIconSvg />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Linkini əlavə et</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>bir neçə dəqiqə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <TimeIconSvg />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Hesabı aktifləşdir</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>bir neçə saniyə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <ShareIconSvg />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Paylaş</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>5 saniyə</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default HomePage;