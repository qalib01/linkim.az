import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { Link, useNavigate, useParams } from "react-router-dom";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";
import errorMessages from "../../../statusMessages/error";


function ResetPasswordRequestPage() {
    const { token } = useParams();
    const [data, setData] = useState({})
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);

        const handleValidateToken = async () => {
            try {
                let res = await apiRequest({
                    url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/validate-token`,
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                });

                if (res.status === 200) {
                    setIsTokenValid(true);
                    setData(res.data);
                } else {
                    setSubmitStatus(res.data);
                    setTimeout(() => { navigate('/p/login') }, 2000);
                }
            } catch (error) {
                setSubmitStatus(errorMessages.GENERAL_ERROR)
            }
        }

        if(token) handleValidateToken();
    }, [token, navigate]);

    return (
        <Section sectionName='reset-password' sectionBg='bgTransparent'>
            <div className="row gy-4" style={{ margin: '100px 0' }}>
                <div className="col-lg-6 m-auto">
                    <div className="row text-center">
                        <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                            <h2 className={`title mt-3`}> Şifrənin yenilənməsi </h2>
                        </div>
                    </div>
                    {isTokenValid ? (
                        <>
                            <Form config={new ConfigGenerator().generateResetPassword('update')} initialData={data || ''} attributes={{ buttonLoc: 'center', classList: classes.form }} />
                            <div className={classes.hasAccount}>
                                <p> Artıq hesabın varsa, hesabına <Link to='/p/login'>buradan</Link> giriş edə və ya yeni hesab yaratmaq istəyirsənsə, <Link to='/p/register'> buraya </Link> daxil ola bilərsən. </p>
                            </div>
                        </>
                    ) : (
                        <p> {submitStatus && submitStatus.message} </p>
                    )}
                </div>
            </div>
        </Section>
    )
}

export default ResetPasswordRequestPage;