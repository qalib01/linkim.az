import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { hasMinLength, isValidEmail, isEqualsToOtherValue, isNotEmpty } from "../../../utils/validation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../../components/Form/Input";
import classes from './Auth.module.scss';
import { useInput } from "../../../hooks/useInput";
import Alert from "../../../components/Alert/Alert";
import { apiRequest } from "../../../utils/apiRequest";
import Button from "../../../components/Button/Button";
import errorMessages from "../../../statusMessages/error";
import { ROUTES } from "../../../utils/routes";


function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        value: nameValue,
        handleInputChange: handleNameChange,
        handleInputBlur: handleNameBlur,
        hasError: hasNameError,
        handleInputReset: handleNameReset,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: surnameValue,
        handleInputChange: handleSurnameChange,
        handleInputBlur: handleSurnameBlur,
        hasError: hasSurnameError,
        handleInputReset: handleSurnameReset,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: hasEmailError,
        handleInputReset: handleEmailReset,
    } = useInput('', (value) => isValidEmail(value) && isNotEmpty(value), (value) => value.toLowerCase());

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

    const userData = { nameValue, surnameValue, emailValue, passwordValue, username }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        if (hasNameError || hasSurnameError || hasEmailError || hasPasswordError || hasPasswordConfirmError) {
            setLoading(false);
            return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
        };

        let response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.REGISTER}`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = response.data;
        setSubmitStatus(data);
        setLoading(false);
        
        if (response.status === 200) {
            handleNameReset();
            handleSurnameReset();
            handleEmailReset();
            handlePasswordReset();
            handlePasswordConfirmReset();
            setTimeout(() => { navigate('/p/') }, 4000);
        }
    }

    return (
        <Section sectionName='register' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Qeydiyyat </h2>
                        </div>
                    </div>
                    <form method="post" className={classes.form} onSubmit={handleSubmit}>
                        <div className="row gy-4">
                            <Input
                                id='name'
                                type='text'
                                name='name'
                                label='Ad'
                                placeholder='Adın'
                                required={true}
                                value={nameValue}
                                onChange={handleNameChange}
                                onBlur={handleNameBlur}
                                error={hasNameError}
                            />
                            <Input
                                id='surname'
                                type='text'
                                name='surname'
                                label='Soyad'
                                placeholder='Soyadın'
                                required={true}
                                value={surnameValue}
                                onChange={handleSurnameChange}
                                onBlur={handleSurnameBlur}
                                error={hasSurnameError}
                            />
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
                                label='Şifrə təkrar'
                                placeholder='Şifrənin təkrar'
                                required={true}
                                value={passwordConfirmValue}
                                onChange={handlePasswordConfirmChange}
                                onBlur={handlePasswordConfirmBlur}
                                error={hasPasswordConfirmError}
                            />
                            <div className="text-center">
                                <Button asButton={true} type="submit" disabled={loading}>{loading ? 'Göndərilir...' : 'Göndər'}</Button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Artıq hesabın varsa, hesabına <Link to='/p/login'>buradan</Link> giriş edə bilərsən. </p>
                    </div>
                    {submitStatus && (
                        <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
                    )}
                </div>
            </div>
        </Section>
    )
}

export default RegisterPage;