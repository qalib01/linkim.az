import { useEffect } from "react";
import Section from "../../../components/Section/Section";
import { hasMinLength, isEmail, isNotEmpty } from "../../../utils/validation";
import { Link } from "react-router-dom";
import Input from "../../../components/Form/Input";
import classes from './Auth.module.scss';
import { useInput } from "../../../hooks/useInput";

function LoginPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    function handleSubmit(event) {
        event.preventDefault();

        if (hasEmailError || hasPasswordError) {
            return;
        }
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
                            <div className="text-center">
                                <button type="submit">Göndər</button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Hesabın yoxdursa, yeni hesabını <Link to='/p/register'> buradan </Link> yarada edə bilərsən. </p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default LoginPage;