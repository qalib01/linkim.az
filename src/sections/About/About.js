import { Link } from "react-router-dom";
import SectionLayout from "../Root/SectionLayout";
import classes from './About.module.scss';
import WhyUs from "../WhyUs/WhyUs";
import Team from "../Team/Team";

function About() {
    return (
        <>
            <SectionLayout sectionName='about' sectionBg='bgTransparent'>
                <div className="row">
                    <div className={`${classes.content} pe-md-0 pe-lg-5`}>
                        <div class="content">
                            <div class="row">
                                <div class="col-12 col-lg-6 order-lg-2 offset-xl-1">
                                    <div class="img-wrap text-md-left">
                                        <div class="img">
                                            {/* <img src="assets/img/img_v_3.jpg" alt="circle image" class="img-fluid" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div class="px-3">
                                        <h1 class={`${classes.title} mb-4`}>
                                            Məqsədimiz
                                        </h1>
                                        <p class="lead">
                                            "linkim.az" olaraq, istifadəçilərimizin onlayn kimliklərini daha sadə və effektiv bir şəkildə paylaşmalarına kömək edirik. Fərqli sosial media platformalarında olan hesablarını və şəxsi keçidlərini tək bir yerdə toplamağa imkan verən bir platforma olaraq, istifadəçilərə zaman və rahatlıq qazandırırıq.
                                        </p>
                                        <p class="mb-2">
                                            Məqsədimiz, hər kəsin öz şəxsiyyətini və brendini bir kliklə göstərməsini asanlaşdırmaqdır. İstifadəsi sadə, funksional və hər kəsin ehtiyaclarına uyğun olan "linkim.az" ilə rəqəmsal izlərini bir araya gətir və dünyaya öz unikal profilini paylaş!
                                        </p>
                                        <p>
                                            <Link to='/register'> İndi başla </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
            <SectionLayout sectionName='' sectionBg='bgWhite'>
                <div class="row gy-4 justify-content-center">
                    <div class="col-lg-5">
                        <div class="images-overlap">
                            {/* <img src="assets/img/img_v_1.jpg" alt="student" class="img-fluid img-1" data-aos="fade-up" /> */}
                        </div>
                    </div>
                    <div class="col-lg-4 ps-lg-5">
                        <p class="lead">
                            Biz, texnologiyanın həyatımızı necə sadələşdirə biləcəyinə inanırıq və məhz bu səbəbdən istifadəçilərimiz üçün hər gün inkişaf etməyə çalışırıq.
                        </p>
                        <p class="mb-2">
                            Misiyamız, həm fərdi istifadəçilərin, həm də bizneslərin onlayn varlığını gücləndirəcək yenilikçi həllər təqdim etməkdir.
                        </p>
                    </div>
                </div>
            </SectionLayout>
            <WhyUs />
            <Team />
        </>
    )
}

export default About;