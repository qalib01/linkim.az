import SectionLayout from '../Root/SectionLayout';
import classes from './Services.module.css';
import socialTwitter from './social_twitter.jpg'

function ServicesSection() {
    return (
        <SectionLayout sectionName='services'>
            <div className="row">
                <div className="col">
                    <div className="text-center mb-3">
                        <h4 className={ classes.title }> Üstünlüklərimiz </h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="service-box text-center mt-5">
                        <div>
                            <img className={ classes.serviceBoxIcon } src={socialTwitter} />
                        </div>
                        <p className={`${ classes.serviceBoxText } mt-3 mb-0`}> Duis vulputate neque sed justo varius, vel lobortis sed lacus. </p>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="service-box text-center mt-5">
                        <img className={ classes.serviceBoxIcon } src="assets/images/dev.svg" />
                        <p className={`${ classes.serviceBoxText } mt-3 mb-0`}> Duis vulputate neque sed justo varius, vel lobortis sed lacus. </p>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="service-box text-center mt-5">
                        <img className={ classes.serviceBoxIcon } src="assets/images/marketing.svg" />
                        <p className={`${ classes.serviceBoxText } mt-3 mb-0`}> Duis vulputate neque sed justo varius, vel lobortis sed lacus. </p>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default ServicesSection;