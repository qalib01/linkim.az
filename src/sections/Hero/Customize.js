import { Link } from "react-router-dom";
import classes from './Hero.module.css';
import SectionLayout from "../Root/SectionLayout";

function CustomizeSection() {
    return (
        <SectionLayout sectionName='customize' sectionBg='bgElectricViolet'>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6 order-2 order-lg-2 mt-4 mt-lg-0 pt-4 pt-lg-0">
                    <div className={`${classes.content} pe-md-0 pe-lg-5`}>
                        <h2 className={` ${classes.title} mt-3`}> Linkini dəqiqələr içində yarat </h2>
                        <p className={`${classes.text} mt-3 mb-0`}> Tiktok, Instagram, X, web sayt, mağaza, canlı yayım, musiqi və daha çoxunu 1 linkdə topla və paylaş </p>
                        <Link to="/register"> İndi başla </Link>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 order-1 order-lg-1">
                    {/* <div className={`${classes.customizeImage} wings position-relative mx-3 mx-md-4 ms-lg-5`}>
                        <img className="rounded img-fluid w-100 position-relative" src="assets/images/customize.jpg" alt="Customize" />
                    </div> */}
                </div>
            </div>
        </SectionLayout>
    )
}

export default CustomizeSection;