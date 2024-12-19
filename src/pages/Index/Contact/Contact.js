import { useEffect, useState } from "react";
import Textarea from "../../../components/Form/Textarea";
import Input from "../../../components/Form/Input";
import classes from './Contact.module.scss'
import { hasMaxTrimedLength, isEmail, isNotEmpty } from "../../../utils/validation";
import Section from "../../../components/Section/Section";
import { useInput } from "../../../hooks/useInput";
import Alert from "../../../components/Alert/Alert";
import { apiRequest } from "../../../utils/apiRequest";
import useAuth from "../../../hooks/useAuth";
import errorMessages from "../../../statusMessages/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button/Button";

function ContactPage() {
  const { user } = useAuth();
  const maxDataLength = 300;
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
  } = useInput(user ? user.name + ' ' + user.surname : '', (value) => isNotEmpty(value));

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
    handleInputReset: handleEmailReset,
  } = useInput(user ? user.email : '', (value) => isEmail(value) && isNotEmpty(value), (value) => value.toLowerCase());

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
  } = useInput('', (value) => isNotEmpty(value) && hasMaxTrimedLength(value, maxDataLength));

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (hasFullnameError || hasEmailError || hasSubjectError || hasMessageError) {
      return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
    }

    let response = await apiRequest({
      url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/contact`,
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullnameValue, emailValue, subjectValue, messageValue }),
    });

    setLoading(false);
    if (response.status !== 200) return setSubmitStatus(response.data);

    setSubmitStatus(response.data);
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
                  <FontAwesomeIcon icon={faLocationDot} />
                  <h3>Ofisimiz</h3>
                  <p>Bakı şəhəri</p>
                  <p>Onlayn fəaliyyət göstərir</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.infoItem}>
                  <FontAwesomeIcon icon={faPhone} />
                  <h3>Mobil nömrərlərimiz</h3>
                  <p>+994 (50) 703 84 81</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.infoItem}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <h3>Email hesablarımız</h3>
                  <p>info@linkim.az</p>
                  <p>contact@linkim.az</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.infoItem}>
                  <FontAwesomeIcon icon={faClock} />
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
                  value={user ? user.name + ' ' + user.surname : fullnameValue}
                  onChange={handleFullnameChange}
                  onBlur={handleFullnameBlur}
                  error={hasFullnameError}
                  disabled={user && true}
                />
                <Input
                  id='email'
                  type='email'
                  name='email'
                  label='Email'
                  placeholder='Emailin'
                  required={true}
                  value={user ? user.email : emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  error={hasEmailError}
                  disabled={user && true}
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
                  maxLength={maxDataLength}
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