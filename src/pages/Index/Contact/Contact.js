import { useEffect } from "react";
import classes from './Contact.module.scss'
import Section from "../../../components/Section/Section";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";


function ContactPage() {
  const { localUser } = useAuth();
  localUser && (localUser.fullName = `${localUser?.name} ${localUser?.surname}` || '');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <Form config={new ConfigGenerator().generateContactMessage('send')} initialData={ localUser || '' } attributes={{ buttonLoc: 'center', classList: classes.form }} />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ContactPage;