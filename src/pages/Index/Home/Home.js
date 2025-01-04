import { useEffect } from "react";
import Section from "../../../components/Section/Section";
import classes from './Home.module.scss'
import Hero from "../../../components/Hero/Hero";
import Button from "../../../components/Button/Button";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faShareFromSquare, faStopwatch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";


function HomePage() {
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Hero sectionName='hero' sectionBg='bgPastelGreen'>
                <h1 className={`title mt-3`}> Bütün linklər indi sadəcə 1 yerdə </h1>
                <p className={`mt-3 mb-0`}> İndi sən də bizim inkişaf etməkdə olan platformamıza qoşularaq bütün Facebook, Instagram, Tiktok, X və digər linklərini sadəcə bir link üzərindən paylaş </p>
                <Button to={isAuthenticated ? '/u/' : '/p/register'}>{isAuthenticated ? 'Hesabım' : 'İndi başla'}</Button>
            </Hero>
            <Hero sectionName='customize' order={2} sectionBg='bgElectricViolet'>
                <h2 className={`title mt-3`}> Linkini dəqiqələr içində yarat </h2>
                <p className={`mt-3 mb-0`}> Tiktok, Instagram, X, web sayt, mağaza, canlı yayım, musiqi və daha çoxunu 1 linkdə topla və paylaş </p>
                <Button to={isAuthenticated ? '/u/' : '/p/register'}>{isAuthenticated ? 'Hesabım' : 'İndi başla'}</Button>
            </Hero>
            <Hero sectionName='share' sectionBg='bgSkyBlue'>
                <h3 className={`title mt-3`}> Linklərini daha rahat paylaş </h3>
                <p className={`mt-3 mb-0`}> Bütün linklərini linkim.az platformasından qeydiyyatdan keçir, sosial şəbəkələrinin bio hissəsinə əlavə et və rahatlıqdan faydalan </p>
                <Button to={isAuthenticated ? '/u/' : '/p/register'}>{isAuthenticated ? 'Hesabım' : 'İndi başla'}</Button>
            </Hero>
            <Instructions />
            <CheckAvaliableUserLink />
            <Subscribe />
        </>

    )
}

function Instructions() {
    const { isAuthenticated } = useAuth();
    return (
        <Section sectionName='instructions' sectionBg='bgTransparent'>
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className={classes.instructionsBoxText}>
                        <h4 className={`title mt-3 mb-4`}>Bir neçə dəqiqəyə yarat və paylaş</h4>
                        <p>LinkimAz ilə şəxsi və sosial media hesablarını tək bir platformada birləşdirmək çox asandır. Bir neçə sadə addımla bütün əlaqələrini idarə edə və izləyicilərinə bir kliklə təqdim edə bilərsən.</p>
                        <p>Ən sevdiyin sosial media platformalarını bir araya gətirərək, izləyicilərin və dostların üçün aydın və rahat keçid nöqtəsi yaradacaqsan. İndi addım-addım öz linkini hazırla və paylaş!</p>
                        <div className={classes.instructionsBoxLink}>
                            <Button to={isAuthenticated ? '/u/' : '/p/register'}>{isAuthenticated ? 'Hesabım' : 'İndi başla'}</Button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="text-center ps-0 ps-lg-5">
                        <div className="row gx-3">
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Qeydiyyatdan keç</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>10 saniyə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <FontAwesomeIcon icon={faStopwatch} />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Hesabı aktifləşdir</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>bir neçə saniyə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <FontAwesomeIcon icon={faLink} />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Linkini əlavə et</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>bir neçə dəqiqə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <FontAwesomeIcon icon={faShareFromSquare} />
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

function CheckAvaliableUserLink() {
    return (
        <Section sectionName='instructions' sectionBg='bgWhite'>
            <div className="text-center">
                <h4 className={`title mt-3 mb-4`}>İstifadəçi adını axtar</h4>
                <p>Aşağıdakı formdan istədiyin istifadəçi adını axtararaq sistemdə mövcud olub-olmamasını örgənə bilərsən!</p>
                <div className="col-12 col-lg-6 m-auto mt-4">
                    <Form config={new ConfigGenerator().generateUsernameAvaliability('find')} initialData='' attributes={{buttonLoc: 'center'}} />
                </div>
            </div>
        </Section>
    )
}

function Subscribe() {
    return (
        <Section sectionName='instructions' sectionBg='bgTransparent'>
            <div className="text-center">
                <h4 className={`title mt-3 mb-4`}>Abunə ol</h4>
                <p>Aşağıdakı formdan abunələrimiz arasına daxil ola və yeniliklərdən, xəbərlərdən və daha çoxundan ən qısa zaman ərzində xəbərdar ola bilərsən!</p>
                <div className="col-12 col-lg-6 m-auto mt-4">
                    <Form config={new ConfigGenerator().generateSubscribe('add')} initialData='' attributes={{buttonLoc: 'center'}} />
                </div>
            </div>
        </Section>
    )
}

export default HomePage;