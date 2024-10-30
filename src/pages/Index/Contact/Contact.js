import { useEffect, useState } from "react";
import Textarea from "../../../components/Form/Textarea";
import Input from "../../../components/Form/Input";
import classes from './Contact.module.scss'
import { isEmail, isNotEmpty } from "../../../utils/validation";
import Section from "../../../components/Section/Section";
import EmailIconSvg from "../../../components/Icons/EmailIconSvg";
import LocationIconSvg from "../../../components/Icons/LocationIconSvg";
import PhoneIconSvg from "../../../components/Icons/PhoneIconSvg";
import WorkHoursIconSvg from "../../../components/Icons/WorkHoursIconSvg";
import { useInput } from "../../../hooks/useInput";
import Alert from "../../../components/Alert/Alert";
import { apiRequest } from "../../../utils/apiRequest";
import Button from "../../../components/Button/Button";

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    value: fullnameValue,
    handleInputChange: handleFullnameChange,
    handleInputBlur: handleFullnameBlur,
    hasError: hasFullnameError,
    handleInputReset: handleFullnameReset,
  } = useInput('', (value) => isNotEmpty(value));

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
    handleInputReset: handleEmailReset,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: subjectValue,
    handleInputChange: handleSubjectChange,
    handleInputBlur: handleSubjectBlur,
    hasError: hasSubjectError,
    handleInputReset: handleSubjectReset,
  } = useInput('', (value) => isNotEmpty(value));

  const {
    value: messageValue,
    handleInputChange: handleMessageChange,
    handleInputBlur: handleMessageBlur,
    hasError: hasMessageError,
    handleInputReset: handleMessageReset,
  } = useInput('', (value) => isNotEmpty(value));

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (hasFullnameError || hasEmailError || hasSubjectError || hasMessageError) {
      return setSubmitStatus({ type: 'error', message: 'Bütün xanalar tam doldurulmalıdır!' });
    }

    let data = await apiRequest({
      url: `${process.env.REACT_APP_API_LINK}/contact`,
      method: 'POST',
      body: { fullnameValue, emailValue, subjectValue, messageValue }
    });

    setSubmitStatus(data);
    handleFullnameReset();
    handleEmailReset();
    handleSubjectReset();
    handleMessageReset();
    setLoading(false);
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
                  <LocationIconSvg />
                  <h3>Ofisimiz</h3>
                  <p>Bakı şəhəri</p>
                  <p>Onlayn fəaliyyət göstərir</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.infoItem}>
                  <PhoneIconSvg />
                  <h3>Mobil nömrərlərimiz</h3>
                  <p>+1 5589 55488 55</p>
                  <p>+1 6678 254445 41</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.infoItem}>
                  <EmailIconSvg />
                  <h3>Email hesablarımız</h3>
                  <p>info@linkim.az</p>
                  <p>contact@linkim.az</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.infoItem}>
                  <WorkHoursIconSvg />
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
                  value={fullnameValue}
                  onChange={handleFullnameChange}
                  onBlur={handleFullnameBlur}
                  error={hasFullnameError}
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
                  id='subject'
                  type='text'
                  name='subject'
                  label='Mövzu'
                  placeholder='Mövzun'
                  required={true}
                  value={subjectValue}
                  onChange={handleSubjectChange}
                  onBlur={handleSubjectBlur}
                  error={hasSubjectError}
                />
                <Textarea
                  id='message'
                  name='message'
                  label='Mesaj'
                  placeholder='Mesajın'
                  rows={6}
                  value={messageValue}
                  onChange={handleMessageChange}
                  onBlur={handleMessageBlur}
                  error={hasMessageError}
                />
                <div className="text-center">
                  <Button asButton={true} type="submit" disabled={loading && true}>{loading ? 'Göndərilir...' : 'Göndər'}</Button>
                </div>
              </div>
            </form>
            {submitStatus && (
              <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ContactPage;