import Section from '../../components/Section/Section';
import classes from './Contact.module.scss';
import emailSvg from './email.svg';
import phoneSvg from './phone.svg';
import locationSvg from './location.svg';
import workSvg from './work.svg';
import Input from "../../components/Form/Input";
import { useState } from "react";
import { isEmail, isNotEmpty } from "../../utils/validation";
import Textarea from "../../components/Form/Textarea";

function Contact() {
    const [enteredValues, setEnteredValues] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const [didEdit, setDidEdit] = useState({
        fullName: false,
        email: false,
        subject: false,
        message: false,
    })

    const fullNameIsInvalid = didEdit.fullName && !isNotEmpty(enteredValues.fullName);
    const emailIsInvalid = didEdit.email && (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
    const subjectIsInvalid = didEdit.subject && !isNotEmpty(enteredValues.subject);
    const messageIsInvalid = didEdit.message && !isNotEmpty(enteredValues.message);

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
        <Section sectionBg='bgTransparent'>
            <div style={{ margin: '100px 0' }}>
                <div className="row text-center">
                    <div className={`content pe-md-0 pe-lg-5  mb-5`}>
                        <h2 className={`title mt-3`}> Əlaqə </h2>
                    </div>
                </div>
                <div className="row gy-4">
                    <div className="col-lg-6">
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <div className={classes.infoItem}>
                                    <img src={locationSvg} alt="Location" />
                                    <h3>Ofisimiz</h3>
                                    <p>Bakı şəhəri</p>
                                    <p>Onlayn fəaliyyət göstərir</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classes.infoItem}>
                                    <img src={phoneSvg} alt="Phone" />
                                    <h3>Mobil nömrərlərimiz</h3>
                                    <p>+1 5589 55488 55</p>
                                    <p>+1 6678 254445 41</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classes.infoItem}>
                                    <img src={emailSvg} alt="Email" />
                                    <h3>Email hesablarımız</h3>
                                    <p>info@linkim.az</p>
                                    <p>contact@linkim.az</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classes.infoItem}>
                                    <img src={workSvg} alt="Work" />
                                    <h3>İş saatları</h3>
                                    <p>Hərgün</p>
                                    <p>9:00 - 18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form method="post" className={classes.form} onSubmit={handleSubmit}>
                            <div className="row gy-4">
                                <Input 
                                    id='fullName' 
                                    type='text' 
                                    name='fullName' 
                                    label='Tam ad' 
                                    placeholder='Tam adın' 
                                    required={true} 
                                    onChange={(event) => handleInputChange('fullName', event.target.value)} 
                                    onBlur={() => handleInputBlur('fullName')} 
                                    error={fullNameIsInvalid} 
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
                                    id='subject' 
                                    type='text' 
                                    name='subject' 
                                    label='Mövzu' 
                                    placeholder='Mövzun' 
                                    required={true} 
                                    onChange={(event) => handleInputChange('subject', event.target.value)} 
                                    onBlur={() => handleInputBlur('subject')} 
                                    error={subjectIsInvalid} 
                                />
                                <Textarea 
                                    id='message' 
                                    name='message' 
                                    label='Mesaj' 
                                    placeholder='Mesajın' 
                                    rows={6} 
                                    onChange={(event) => handleInputChange('message', event.target.value)} 
                                    onBlur={() => handleInputBlur('message')} 
                                    error={messageIsInvalid} 
                                />
                                <div className="text-center">
                                    <button type="submit">Göndər</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default Contact;