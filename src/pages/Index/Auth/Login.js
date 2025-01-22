import { useEffect } from "react";
import Section from "../../../components/Section/Section";
import { Link } from "react-router-dom";
import classes from './Auth.module.scss';
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";

function LoginPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Section sectionName='login' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Giriş </h2>
                        </div>
                    </div>
                    <Form config={new ConfigGenerator().userLogin('add')} initialData={''} attributes={{ buttonLoc: 'center', classList: classes.form }} />
                    <div className={classes.hasAccount}>
                        <p> Hesabın yoxdursa, yeni hesabını <Link to='/p/register'>buradan</Link> yarada edə bilərsən. </p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default LoginPage;