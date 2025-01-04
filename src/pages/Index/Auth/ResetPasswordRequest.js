import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { Link } from "react-router-dom";
import classes from './Auth.module.scss';
import Alert from "../../../components/Alert/Alert";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";


function ResetPasswordRequestPage() {
    const [submitStatus, setSubmitStatus] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Section sectionName='reset-password-request' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Şifrənin yenilənməsi </h2>
                        </div>
                    </div>
                    <Form config={new ConfigGenerator().generateResetPasswordRequest('add')} initialData='' attributes={{ buttonLoc: 'center', classList: classes.form }} />
                    <div className={classes.hasAccount}>
                        <p> Artıq hesabın varsa, hesabına <Link to='/p/login'>buradan</Link> giriş edə və ya yeni hesab yaratmaq istəyirsənsə, <Link to='/p/register'> buraya </Link> daxil ola bilərsən. </p>
                    </div>
                    {submitStatus && (
                        <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
                    )}
                </div>
            </div>
        </Section>
    )
}

export default ResetPasswordRequestPage;