import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { isEmail, isNotEmpty } from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Form/Input";
import classes from './Auth.module.scss';
import { useInput } from "../../../hooks/useInput";
import Alert from "../../../components/Alert/Alert";
import { apiRequest } from "../../../utils/apiRequest";


function ResetPasswordRequestPage() {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: hasEmailError,
        handleInputReset: handleEmailReset,
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        if (hasEmailError) {
            return setSubmitStatus({ type: 'error', message: 'Bütün xanalar tam doldurulmalıdır!' });
        }

        let data = await apiRequest({
            url: 'http://localhost:1007/reset-password-request',
            method: 'POST',
            body: { emailValue }
        });

        setSubmitStatus(data);
        setLoading(false);
        if (data.type === 'success') {
            handleEmailReset();
            navigate('/p/login');
        }
    }

    return (
        <Section sectionName='register' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Şifrəni yenilə </h2>
                        </div>
                    </div>
                    <form method="post" className={classes.form} onSubmit={handleSubmit}>
                        <div className="row gy-4">
                            <Input
                                id='email'
                                type='email'
                                name='email'
                                label='Email'
                                placeholder='Emailin'
                                required={true}
                                value={emailValue}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                error={hasEmailError}
                            />
                            <div className="text-center">
                                <button type="submit" disabled={loading && true}>{loading ? 'Göndərilir...' : 'Göndər'}</button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Artıq hesabın varsa, hesabına <Link to='/p/login'> buradan </Link> giriş edə və ya yeni hesab yaratmaq istəyirsənsə, <Link to='/p/register'> buraya </Link> daxil ola bilərsən. </p>
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