import { Link } from "react-router-dom";
import SectionLayout from "../Root/SectionLayout";
import classes from './Login.module.scss';

function Login() {
    return (
        <SectionLayout sectionName='login' sectionBg='bgTransparent'>
            <div className="row gy-4">
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={` ${classes.title} mt-3`}> Giriş </h2>
                        </div>
                    </div>
                    <form method="post" className={classes.form}>
                        <div className="row gy-4">
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
                        <p> Hesabın yoxdursa, yeni hesabını <Link to='/register'> buradan </Link> yarada edə bilərsən. </p>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default Login;