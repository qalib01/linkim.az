import { Link } from "react-router-dom";
import SectionLayout from "../Root/SectionLayout";
import classes from './Login.module.scss';
import { useState } from "react";
import { isEmail, isNotEmpty, hasMinLength } from '../../utils/validation';
import Input from "../../components/Form/Input";

function Login() {
    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    })

    const emailIsInvalid = didEdit.email && (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
    const passwordIsInvalid = didEdit.password && (!hasMinLength(enteredValues.password, 8) || !isNotEmpty(enteredValues.password));

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleInputChange(identifier, event) {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [identifier]: event
        }));

        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false
        }));
    }

    function handleInputBlur(identifier) {
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true
        }))
    }
 
    return (
        <SectionLayout sectionName='login' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={` ${classes.title} mt-3`}> Giriş </h2>
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
                                onChange={(event) => handleInputChange('email', event.target.value)}
                                onBlur={() => handleInputBlur('email')} 
                                error={emailIsInvalid} 
                             />
                            <Input 
                                id='password' 
                                type='password' 
                                name='password' 
                                label='Şifrə' 
                                placeholder='Şifrən' 
                                required={true}
                                onChange={(event) => handleInputChange('password', event.target.value)}
                                onBlur={() => handleInputBlur('password')} 
                                error={passwordIsInvalid} 
                            />
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