import { Link } from "react-router-dom";
import classes from './Register.module.scss';
import { useState } from "react";
import { hasMinLength, isEmail, isEqualsToOtherValue, isNotEmpty } from "../../utils/validation";
import Input from "../../components/Form/Input";
import SectionLayout from "../Root/SectionLayout";

function Register() {
    const [enteredValues, setEnteredValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [didEdit, setDidEdit] = useState({
        name: false,
        surname: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    const nameIsInvalid = didEdit.name && !isNotEmpty(enteredValues.name);
    const surnameIsInvalid = didEdit.surname && !isNotEmpty(enteredValues.surname);
    const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
    const passwordIsInvalid = didEdit.password && (!hasMinLength(enteredValues.password, 8) || !isNotEmpty(enteredValues.password));
    const passwordConfirmIsInvalid = didEdit.confirmPassword && (!isEqualsToOtherValue(enteredValues.password, enteredValues.confirmPassword) || !isNotEmpty(enteredValues.confirmPassword));

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

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <SectionLayout sectionName='register' sectionBg='bgTransparent'>
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
                                onChange={(event) => handleInputChange('name', event.target.value)}
                                onBlur={() => handleInputBlur('name')} 
                                error={nameIsInvalid} 
                             />
                            <Input 
                                id='surname' 
                                type='text' 
                                name='surname' 
                                label='Soyad' 
                                placeholder='Soyadın' 
                                required={true} 
                                onChange={(event) => handleInputChange('surname', event.target.value)}
                                onBlur={() => handleInputBlur('surname')} 
                                error={surnameIsInvalid} 
                             />
                            <Input 
                                id='email' 
                                type='email' 
                                name='email' 
                                label='Email' 
                                placeholder='Emailin' 
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
                            <Input 
                                id='confirmPassword' 
                                type='password' 
                                name='confirmPassword' 
                                label='Təkrar şifrə' 
                                placeholder='Şifrən təkrar' 
                                required={true} 
                                onChange={(event) => handleInputChange('confirmPassword', event.target.value)}
                                onBlur={() => handleInputBlur('confirmPassword')} 
                                error={passwordConfirmIsInvalid} 
                             />
                            <div className="text-center">
                                <button type="submit">Göndər</button>
                            </div>
                        </div>
                    </form>
                    <div className={classes.hasAccount}>
                        <p> Artıq hesabın varsa, hesabına <Link to='/login'> buradan </Link> giriş edə bilərsən. </p>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default Register;