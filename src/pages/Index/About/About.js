import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { Link } from "react-router-dom";
import classes from './About.module.scss';
import ShareIconWithLaptopSvg from "../../../components/Icons/ShareIconWithLaptopSvg";
import SuitableIconSvg from "../../../components/Icons/SuitableIconSvg";
import AllInOneIconSvg from "../../../components/Icons/AllInOneIconSvg";
import UserFriendlyIconSvg from "../../../components/Icons/UserFriendlyIconSvg";
import { fetchTeam } from "../../../utils/http";

function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Section sectionName='about' sectionBg='bgTransparent'>
                <div className="row">
                    <div className={`content pe-md-0 pe-lg-5`}>
                        <div className="content">
                            <div className="row">
                                <div className="col-12 col-lg-6 order-lg-2 offset-xl-1">
                                    <div className="img-wrap text-md-left">
                                        <div className="img">
                                            {/* <img src="assets/img/img_v_3.jpg" alt="circle image" className="img-fluid" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="px-3">
                                        <h1 className={`title mb-4`}>
                                            Məqsədimiz
                                        </h1>
                                        <p className="lead">
                                            "linkim.az" olaraq, istifadəçilərimizin onlayn kimliklərini daha sadə və effektiv bir şəkildə paylaşmalarına kömək edirik. Fərqli sosial media platformalarında olan hesablarını və şəxsi keçidlərini tək bir yerdə toplamağa imkan verən bir platforma olaraq, istifadəçilərə zaman və rahatlıq qazandırırıq.
                                        </p>
                                        <p className="mb-2">
                                            Məqsədimiz, hər kəsin öz şəxsiyyətini və brendini bir kliklə göstərməsini asanlaşdırmaqdır. İstifadəsi sadə, funksional və hər kəsin ehtiyaclarına uyğun olan "linkim.az" ilə rəqəmsal izlərini bir araya gətir və dünyaya öz unikal profilini paylaş!
                                        </p>
                                        <p>
                                            <Link to='/p/register'> İndi başla </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Section sectionName='' sectionBg='bgWhite'>
                <div className="row gy-4 justify-content-center">
                    <div className="col-lg-5">
                        <div className="images-overlap">
                            {/* <img src="assets/img/img_v_1.jpg" alt="student" className="img-fluid img-1" data-aos="fade-up" /> */}
                        </div>
                    </div>
                    <div className="col-lg-4 ps-lg-5">
                        <p className="lead">
                            Biz, texnologiyanın həyatımızı necə sadələşdirə biləcəyinə inanırıq və məhz bu səbəbdən istifadəçilərimiz üçün hər gün inkişaf etməyə çalışırıq.
                        </p>
                        <p className="mb-2">
                            Misiyamız, həm fərdi istifadəçilərin, həm də bizneslərin onlayn varlığını gücləndirəcək yenilikçi həllər təqdim etməkdir.
                        </p>
                    </div>
                </div>
            </Section>
            <WhyUs />
            <Team />
        </>
    )
}


function Team() {
    const [team, setTeam] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function allTeam() {
            setIsFetching(true);
            try {
                const data = await fetchTeam();
                setTeam(data);
            } catch (error) {
                setError(error)
            }
            setIsFetching(false);
        }
        allTeam();
    }, []);

    return (
        <Section sectionName='team' sectionBg='bgTransparent'>
            <div className="row">
                <div className="col">
                    <div className="section-head text-center mx-auto narrow">
                        <h5 className='title'> Komandamız </h5>
                    </div>
                </div>
            </div>
            <div className="row flex-row-scroll">
                {isFetching && <p> Məlumatlar yüklənir! </p>}
                {!isFetching && team.length === 0 && <p> Hal-hazırda heç bir məlumat yoxdur! </p>}
                {!isFetching && error && <p> Gözlənilməz xəta baş verib, xahiş olunur ki, daha sonra yenidən yoxlayasan! </p>}
                {
                    team.map((data) => (
                        <div key={data.id} className="col-8 col-md-6 col-lg-3">
                            <div className={`mt-3 mt-md-5`}>
                                <div className="card border-0 shadow-sm">
                                    <img src={`http://localhost:1007/images/users/${data.photo}`} className="card-img-top rounded" alt={`${data.name} ${data.surname}`} />
                                    <div className="card-body py-4 text-center">
                                        <p className='fw-bold'>{data.name} {data.surname} </p>
                                        <p className="card-subtitle mb-0 text-muted small">{data.profession}</p>
                                        <Link to={`/${data.username}`}> Linki </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Section>
    )
}


function WhyUs() {
    return (
        <Section sectionName='whyus' sectionBg='bgTransparent'>
            <div className="row">
                <div className="col-12 pt-4" >
                    <div className='pe-md-0 pe-lg-5' style={{ marginBottom: '100px' }}>
                        <h3 className={`title mt-3 text-center`}> Nə üçün linkim.az? </h3>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row gy-4 flex-wrap justify-content-between">
                        <div className="col-md-6 col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <UserFriendlyIconSvg />
                                </div>
                                <div className={classes.content}>
                                    <h3>Sadə və Effektiv</h3>
                                    <p>Bütün sosial media və şəxsi hesablarını bir platformada toplamaq yalnız bir neçə dəqiqə lazımdır</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <AllInOneIconSvg />
                                </div>
                                <div className={classes.content}>
                                    <h3>Hamısı Bir Yerdə</h3>
                                    <p>Facebook, Instagram, X və digər platformalardakı hesablarını bir keçiddə topla və hər şeyi bir kliklə təqdim et</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <ShareIconWithLaptopSvg />
                                </div>
                                <div className={classes.content}>
                                    <h3>Rahat Paylaşım</h3>
                                    <p>Öz şəxsiyyətini və işlərini həm sosial mediada, həm də iş və şəxsi həyatında asanlıqla paylaş</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <SuitableIconSvg />
                                </div>
                                <div className={classes.content}>
                                    <h3>Hərkəsə uyğun</h3>
                                    <p>İstər influencer ol, istərsə də kiçik bir biznes sahibi, "linkim.az" hər kəs üçün ideal bir həll olacaq</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}



export default AboutPage;