import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Section from "../../../components/Section/Section";
import Button from "../../../components/Button/Button";
import errorMessages from "../../../statusMessages/error";


function ActivateUserPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleActivateUser = async () => {
            setLoading(true);
    
            try {
                let response = await apiRequest({
                    url: `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_GLOBAL_API_ENDPOINT}/${process.env.REACT_APP_API_AUTH_USER_ACTIVATE}`,
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });
    
                setSubmitStatus(response.data);
                setIsTokenValid(response.status);
    
                if (response.status === 403) return;
                setTimeout(() => { navigate('/p/login') }, 4000);
            } catch (error) {
                setSubmitStatus(errorMessages.GENERAL_ERROR);
            } finally {
                setLoading(false);
            }
        }

        handleActivateUser();
    }, [token, navigate]);

    const handleCreateNewToken = useCallback(async () => {
        setBtnLoading(true);

        try {
            let response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_GLOBAL_API_ENDPOINT}/${process.env.REACT_APP_API_AUTH_RESEND_USER_ACTIVATE}`,
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: { token },
            });

            setSubmitStatus(response.data);
            setTimeout(() => { navigate('/p/') }, 4000);
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        } finally {
            setBtnLoading(false);
        }
    }, [navigate, token]);

    return (
        <>
            {loading && (<Loader />)}
            {!loading && <Section sectionName='activate-user' sectionBg='bgTransparent'>
                <div className="row gy-4" style={{ margin: '100px 0' }}>
                    <div className="m-auto">
                        <div className="text-center">
                            <div className={`${classes.content} pe-md-0 mb-5`}>
                                <h2 className={`title mt-3`}> Hesabın aktifləşdirilməsi </h2>
                            </div>
                            {isTokenValid !== 200 && (
                                <div className="row justify-content-center">
                                    {isTokenValid !== 403 && <div className="col-12 col-md-3">
                                        <Button to='/p/login'> Giriş </Button>
                                    </div>}
                                    {isTokenValid === 403 && <div className="col-12 col-md-3">
                                        <Button asButton={true} disabled={btnLoading} onClick={handleCreateNewToken}> {btnLoading ? 'Yaradılır...' : 'Yenisini yarat'} </Button>
                                    </div>}
                                    <div className="col-12 col-md-3">
                                        <Button to='/'> Ana səhifə </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {submitStatus && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />}
                    </div>
                </div>
            </Section>}
        </>
    )
}

export default ActivateUserPage;