import SectionLayout from "../Root/SectionLayout";
import classes from './Instructions.module.scss';
import registerSvg from './register.svg';
import linkSvg from './link.svg';
import timeSvg from './time.svg';
import shareSvg from './share.svg'
import { Link } from "react-router-dom";




function Instructions() {
    return (
        <SectionLayout sectionName='instructions' sectionBg='bgTransparent'>
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className={classes.instructionsBoxText}>
                        <h4 className={`${classes.title} mt-3 mb-4`}>Bir neçə dəqiqəyə yarat və paylaş</h4>
                        <p>LinkimAz ilə şəxsi və sosial media hesablarını tək bir platformada birləşdirmək çox asandır. Bir neçə sadə addımla bütün əlaqələrini idarə edə və izləyicilərinə bir kliklə təqdim edə bilərsən.</p>
                        <p>Ən sevdiyin sosial media platformalarını bir araya gətirərək, izləyicilərin və dostların üçün aydın və rahat keçid nöqtəsi yaradacaqsan. İndi addım-addım öz linkini hazırla və paylaş!</p>
                        <div className={classes.instructionsBoxLink}>
                            <Link to="/register"> İndi başla </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="text-center ps-0 ps-lg-5">
                        <div className="row gx-3">
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <img className={classes.instructionsIcon} src={registerSvg} alt="Register" />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Qeydiyyatdan keç</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>10 saniyə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <img className={classes.instructionsIcon} src={linkSvg} alt="Link" />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Linkini əlavə et</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>bir neçə dəqiqə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <img className={classes.instructionsIcon} src={timeSvg} alt="Activate" />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Hesabı aktifləşdir</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>bir neçə saniyə</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6">
                                <div className={`${classes.instructionsBox} bg-white mt-3 px-4 py-4 py-md-5`}>
                                    <img className={classes.instructionsIcon} src={shareSvg} alt="Share" />
                                    <h4 className={`${classes.instructionsTitle} mt-3`}>Paylaş</h4>
                                    <p className={`${classes.instructionsText} text-muted mb-0 small`}>5 saniyə</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default Instructions;