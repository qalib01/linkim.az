import SectionLayout from "../Root/SectionLayout";
import classes from './WhyUs.module.scss';

function WhyUs() {
    return (
        <SectionLayout sectionName='whyus' sectionBg='bgTransparent'>
            <div className="row">
                <div className="col-12 pt-4" >
                    <div className='pe-md-0 pe-lg-5' style={{marginBottom: '100px'}}>
                        <h3 className={` ${classes.title} mt-3 text-center`}> Nə üçün linkim.az? </h3>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row gy-4 flex-wrap">
                        <div className="col-lg-3">
                            <div className="services-item">
                                <div className="services-icon">
                                    <i className="bi bi-bullseye"></i>
                                </div>
                                <div>
                                    <h3>Technology</h3>
                                    <p>Separated they live in Bookmarksgrove right at the coast</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="services-item" data-aos="fade-up" data-aos-delay="100">
                                <div className="services-icon">
                                    <i className="bi bi-command"></i>
                                </div>
                                <div>
                                    <h3>Web Design</h3>
                                    <p>Separated they live in Bookmarksgrove right at the coast</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="services-item" data-aos="fade-up" data-aos-delay="200">
                                <div className="services-icon">
                                    <i className="bi bi-bar-chart"></i>
                                </div>
                                <div>
                                    <h3>Branding</h3>
                                    <p>Separated they live in Bookmarksgrove right at the coast</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default WhyUs;