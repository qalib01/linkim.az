import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Section from "../../../components/Section/Section";
import Button from "../../../components/Button/Button";
import errorMessages from "../../../statusMessages/error";
import { ROUTES } from "../../../utils/routes";


function ActivateSubscriberPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleActivateSubscriber = async () => {
            setLoading(true)

            try {
                let response = await apiRequest({
                    url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.SUBSCRIBE_ACTIVATE}`,
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                setSubmitStatus(response.data, response.status);
                if (response.status !== 200) setIsTokenValid(false);

                if (response.status === 200) {
                    setIsTokenValid(true);
                    setTimeout(() => { navigate('/') }, 4000);
                }
            } catch (error) {
                setSubmitStatus(errorMessages.GENERAL_ERROR);
            } finally {
                setLoading(false);
            }
        }

        if (token) handleActivateSubscriber();
    }, [token, navigate]);

    const handleCreateNewToken = useCallback(async () => {
        setBtnLoading(true);

        try {
            let response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.RESEND_SUBSCRIBE_ACTIVATE}`,
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            setSubmitStatus(response.data);
            if (response.status === 200) { setTimeout(() => { navigate('/') }, 4000) }
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        } finally {
            setBtnLoading(false);
        }
    }, [token, navigate])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Section sectionName='activate-user' sectionBg='bgTransparent'>
                    <div className="row gy-4" style={{ margin: '100px 0' }}>
                        <div className="m-auto">
                            <div className="text-center">
                                <div className={`${classes.content} pe-md-0 mb-5`}>
                                    <h2 className={`title mt-3`}> Abunəliyin aktifləşdirilməsi </h2>
                                </div>
                                <div className="row justify-content-center">
                                    {isTokenValid && <div className="col-12 col-md-3">
                                        <Button to='/p/login'> Giriş </Button>
                                    </div>}
                                    {!isTokenValid && <div className="col-12 col-md-3">
                                        <Button asButton={true} disabled={btnLoading} onClick={handleCreateNewToken}> {btnLoading ? 'Yaradılır...' : 'Yenisini yarat'} </Button>
                                    </div>}
                                    <div className="col-12 col-md-3">
                                        <Button to='/'> Ana səhifə </Button>
                                    </div>
                                </div>
                            </div>
                            {submitStatus && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />}
                        </div>
                    </div>
                </Section>
            )}
        </>
    )
}

export default ActivateSubscriberPage;