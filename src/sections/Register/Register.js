import { Link } from "react-router-dom";
import SectionLayout from "../Root/SectionLayout";
import classes from './Register.module.scss';

function Register() {
    return (
        <SectionLayout sectionName='register' sectionBg='bgTransparent'>
            <div className="row gy-4">
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={` ${classes.title} mt-3`}> Qeydiyyat </h2>
                        </div>
                    </div>
                    <form method="post" className={classes.form}>
                        <div className="row gy-4">
                            <div className="col-12">
                                <input type="text" name="name" className="form-control" placeholder="Adın" required={true} />
                            </div>
                            <div className="col-12">
                                <input type="text" name="name" className="form-control" placeholder="Soyadın" required={true} />
                            </div>
                            <div className="col-12">
                                <input type="email" className="form-control" name="email" placeholder="Email adresin" required={true} />
                            </div>
                            <div className="col-12">
                                <input type="password" className="form-control" name="password" placeholder="Şifrən" required={true} />
                            </div>
                            <div className="text-center">
                                <button type="submit">Göndər</button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Artıq hesabın varsa, hesabına <Link to='/login'> buradan </Link> giriş edə bilərsən. </p>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default Register;