import SectionLayout from "../Root/SectionLayout";
import classes from './Register.module.scss';

function Register() {
    return (
        <SectionLayout sectionBg='bgTransparent'>
            <div className="row text-center">
                <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                    <h2 className={` ${classes.title} mt-3`}> Qeydiyyat </h2>
                </div>
            </div>
            <div className="row gy-4">
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

export default Register;