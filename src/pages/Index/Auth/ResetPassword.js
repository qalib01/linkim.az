import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { hasMinLength, isEqualsToOtherValue, isNotEmpty } from "../../../utils/validation";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Form/Input";
import classes from './Auth.module.scss';
import { useInput } from "../../../hooks/useInput";
import Alert from "../../../components/Alert/Alert";
import { apiRequest } from "../../../utils/apiRequest";


function ResetPasswordRequestPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [emailValue, setEmailValue] = useState('')
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        validateToken(token);
    }, [token]);

    async function validateToken(token) {
        let data = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/validate-token`,
            method: 'POST',
            body: { token }
        });

        if (data.valid) {
            setIsTokenValid(data.valid);
            setEmailValue(data.email);
            console.log(data)
        } else {
            setSubmitStatus({ type: 'error', message: 'Link etibarsızdır.' });
        }
    }

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: hasPasswordError,
        handleInputReset: handlePasswordReset,
    } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value));

    const {
        value: passwordConfirmValue,
        handleInputChange: handlePasswordConfirmChange,
        handleInputBlur: handlePasswordConfirmBlur,
        hasError: hasPasswordConfirmError,
        handleInputReset: handlePasswordConfirmReset,
    } = useInput('', (value) => isEqualsToOtherValue(value, passwordValue) && isNotEmpty(value));

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        if (!token || hasPasswordError || hasPasswordConfirmError) {
            return setSubmitStatus({ type: 'error', message: 'Bütün xanalar tam doldurulmalıdır!' });
        }

        let data = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/reset-password`,
            method: 'POST',
            body: { emailValue, passwordValue }
        });

        setSubmitStatus(data);
        setLoading(false);
        if (data.type === 'success') {
            handlePasswordReset();
            handlePasswordConfirmReset();
            setSubmitStatus(data);
            setTimeout(() => {
                navigate('/p/login'); 
            }, 2000);
        }
    }

    return (
        <Section sectionName='reset-password' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Şifrəni yenilə </h2>
                        </div>
                    </div>
                    {isTokenValid ? (<>
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
                                    disabled={true}
                                />
                                <Input
                                    id='password'
                                    type='password'
                                    name='password'
                                    label='Şifrə'
                                    placeholder='Şifrən'
                                    required={true}
                                    value={passwordValue}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    error={hasPasswordError}
                                />
                                <Input
                                    id='confirmPassword'
                                    type='password'
                                    name='confirmPassword'
                                    label='Təkrar şifrə'
                                    placeholder='Şifrən təkrar'
                                    required={true}
                                    value={passwordConfirmValue}
                                    onChange={handlePasswordConfirmChange}
                                    onBlur={handlePasswordConfirmBlur}
                                    error={hasPasswordConfirmError}
                                />
                                <div className="text-center">
                                    <button type="submit" disabled={loading && true}>{loading ? 'Göndərilir...' : 'Göndər'}</button>
                                </div>
                            </div>
                        </form>
                        <div className={classes.hasAccount}>
                            <p> Artıq hesabın varsa, hesabına <Link to='/p/login'> buradan </Link> giriş edə və ya yeni hesab yaratmaq istəyirsənsə, <Link to='/p/register'> buraya </Link> daxil ola bilərsən. </p>
                        </div>
                    </>) : (
                        <p>Token etibarsızdır və ya müddəti keçib.</p>
                    )}
                    {submitStatus && (
                        <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
                    )}
                </div>
            </div>
        </Section>
    )
}

export default ResetPasswordRequestPage;