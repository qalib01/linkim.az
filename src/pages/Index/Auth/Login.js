import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { hasMinLength, isEmail, isNotEmpty } from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Form/Input";
import classes from './Auth.module.scss';
import { useInput } from "../../../hooks/useInput";
import Alert from "../../../components/Alert/Alert";
import { apiRequest } from "../../../utils/apiRequest";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Button/Button";
import errorMessages from "../../../statusMessages/error";

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const { setUser, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: hasEmailError,
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value), (value) => value.toLowerCase());

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: hasPasswordError,
    } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value));

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        if (hasEmailError || hasPasswordError) {
            return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
        }

        let response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/login`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({emailValue, passwordValue})
        });

        const data = response.data;

        if ( response.status === 200 && response.data.tokens) {
            const { accessToken } = data.tokens;
            if (accessToken) {
                setUser(data.user);
                setIsAuthenticated(true);
                localStorage.setItem('accessToken', accessToken);
                navigate('/u/');
            } else { setSubmitStatus(errorMessages.TOKEN_CANNOT_GET) }
        } else { setSubmitStatus({ type: data.type, message: data.message }) }

        setLoading(false);
    }

    return (
        <Section sectionName='login' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Giriş </h2>
                        </div>
                    </div>
                    <form method="post" className={classes.form} onSubmit={handleSubmit}>
                        <div className="row gy-4">
                            <Input
                                id='email'
                                type='email'
                                name='email'
                                label='Email'
                                placeholder='Email adresin'
                                required={true}
                                value={emailValue}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                error={hasEmailError}
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
                            <div className={classes.hasAccount}>
                                <p> Şifrəni unutmusansa, <Link to='/p/reset-password'>buradan</Link> yeniləyə bilərsən. </p>
                            </div>
                            <div className="text-center">
                                <Button asButton={true} type="submit" disabled={loading && true}>{loading ? 'Göndərilir...' : 'Göndər'}</Button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Hesabın yoxdursa, yeni hesabını <Link to='/p/register'>buradan</Link> yarada edə bilərsən. </p>
                    </div>
                    {submitStatus && (
                        <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
                    )}
                </div>
            </div>
        </Section>
    )
}

export default LoginPage;