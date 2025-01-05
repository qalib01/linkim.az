import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Section from "../../../components/Section/Section";
import Button from "../../../components/Button/Button";


function ActivateSubscriberPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        activateUser(token);
    }, [token]);

    async function activateUser(token) {
        setLoading(true)

        let response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_SUBSCRIBER_ACTIVATE_LINK_KEY}`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        setSubmitStatus(response.data, response.status);
        if (response.status === 403) setIsTokenValid(403);

        if (response.status !== 403) {
            setTimeout(() => { navigate('/') }, 4000);
            setIsTokenValid(response.status);
        }
        setLoading(false);
    }

    async function createNewToken() {
        setBtnLoading(true);

        let response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_RESEND_SUBSCRIBER_ACTIVATE_LINK_KEY}`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        const data = response.data;
        setSubmitStatus(data);
        setBtnLoading(false);
        setTimeout(() => { navigate('/p/') }, 4000);
    }

    return (
        <>
            {loading && (<Loader />)}
            {!loading && <Section sectionName='activate-user' sectionBg='bgTransparent'>
                <div className="row gy-4" style={{ margin: '100px 0' }}>
                    <div className="m-auto">
                        <div className="text-center">
                            <div className={`${classes.content} pe-md-0 mb-5`}>
                                <h2 className={`title mt-3`}> Abunəliyin aktifləşdirilməsi </h2>
                            </div>
                            {isTokenValid !== 200 && (
                                <div className="row justify-content-center">
                                    {isTokenValid !== 403 && <div className="col-12 col-md-3">
                                        <Button to='/p/login'> Giriş </Button>
                                    </div>}
                                    {isTokenValid === 403 && <div className="col-12 col-md-3">
                                        <Button asButton={true} disabled={btnLoading} onClick={createNewToken}> {btnLoading ? 'Yaradılır...' : 'Yenisini yarat'} </Button>
                                    </div>}
                                    <div className="col-12 col-md-3">
                                        <Button to='/'> Ana səhifə </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {submitStatus && (
                            <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
                        )}
                    </div>
                </div>
            </Section>}
        </>
    )
}

export default ActivateSubscriberPage;