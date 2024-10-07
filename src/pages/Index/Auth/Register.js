import { useEffect } from "react";
import Section from "../../../components/Section/Section";
import { hasMinLength, isEmail, isEqualsToOtherValue, isNotEmpty } from "../../../utils/validation";
import { Link } from "react-router-dom";
import Input from "../../../components/Form/Input";
import classes from './Auth.module.scss';
import { useInput } from "../../../hooks/useInput";


function RegisterPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        value: nameValue,
        handleInputChange: handleNameChange,
        handleInputBlur: handleNameBlur,
        hasError: hasNameError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: surnameValue,
        handleInputChange: handleSurnameChange,
        handleInputBlur: handleSurnameBlur,
        hasError: hasSurnameError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: hasEmailError,
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: hasPasswordError,
    } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value));

    const {
        value: passwordConfirmValue,
        handleInputChange: handlePasswordConfirmChange,
        handleInputBlur: handlePasswordConfirmBlur,
        hasError: hasPasswordConfirmError,
    } = useInput('', (value) => isEqualsToOtherValue(value, passwordValue) && isNotEmpty(value));

    function handleSubmit(event) {
        event.preventDefault();

        if (nameValue || surnameValue || emailValue || passwordValue || passwordConfirmValue) {
            return;
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
                                label='Təkrar şifrə' 
                                placeholder='Şifrən təkrar' 
                                required={true} 
                                value={passwordConfirmValue} 
                                onChange={handlePasswordConfirmChange}
                                onBlur={handlePasswordConfirmBlur} 
                                error={hasPasswordConfirmError} 
                             />
                            <div className="text-center">
                                <button type="submit">Göndər</button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Artıq hesabın varsa, hesabına <Link to='/p/login'> buradan </Link> giriş edə bilərsən. </p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default RegisterPage;