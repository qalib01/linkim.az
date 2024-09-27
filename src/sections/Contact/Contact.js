import SectionLayout from "../Root/SectionLayout";
import classes from './Contact.module.scss';
import emailSvg from './email.svg';
import phoneSvg from './phone.svg';
import locationSvg from './location.svg';
import workSvg from './work.svg';

function Contact() {
    return (
        <SectionLayout sectionBg='bgTransparent'>
            <div className="row text-center">
                <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                    <h2 className={` ${classes.title} mt-3`}> Əlaqə </h2>
                </div>
            </div>
            <div className="row gy-4">
                <div className="col-lg-6">
                    <div className="row gy-4">
                        <div className="col-md-6">
                            <div className={classes.infoItem}>
                                <img src={locationSvg} alt="Location" />
                                <h3>Ofisimiz</h3>
                                <p>Bakı şəhəri</p>
                                <p>Onlayn fəaliyyət göstərir</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={classes.infoItem}>
                                <img src={phoneSvg} alt="Phone" />
                                <h3>Mobil nömrərlərimiz</h3>
                                <p>+1 5589 55488 55</p>
                                <p>+1 6678 254445 41</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={classes.infoItem}>
                                <img src={emailSvg} alt="Email" />
                                <h3>Email hesablarımız</h3>
                                <p>info@linkim.az</p>
                                <p>contact@linkim.az</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={classes.infoItem}>
                                <img src={workSvg} alt="Work" />
                                <h3>İş saatları</h3>
                                <p>Hərgün</p>
                                <p>9:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <form method="post" className={classes.emailForm}>
                        <div className="row gy-4">
                            <div className="col-sm-6">
                                <input type="text" name="name" className="form-control" placeholder="Tam adın" required={true} />
                            </div>

                            <div className="col-sm-6">
                                <input type="email" className="form-control" name="email" placeholder="Email adresin" required={true} />
                            </div>

                            <div className="col-12">
                                <input type="text" className="form-control" name="subject" placeholder="Mövzu" required={true} />
                            </div>

                            <div className="col-12">
                                <textarea className="form-control" name="message" rows="6" placeholder="Mesajın" required={true}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit">Göndər</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SectionLayout>
    )
}

export default Contact;