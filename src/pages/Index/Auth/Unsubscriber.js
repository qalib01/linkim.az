import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Section from "../../../components/Section/Section";
import Button from "../../../components/Button/Button";
import errorMessages from "../../../statusMessages/error";


function UnsubscriberPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const activateUser = async () => {
            setLoading(true)

            try {
                let response = await apiRequest({
                    url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_UNSUBSCRIBER_LINK_KEY}`,
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                setSubmitStatus(response.data, response.status);
                setIsTokenValid(response.status);

                if (response.status !== 403) {
                    setTimeout(() => { navigate('/') }, 4000);
                }
                setLoading(false);
            } catch (error) {
                setSubmitStatus(errorMessages.GENERAL_ERROR);
                setIsTokenValid(403);
            } finally {
                setLoading(false);
            }
        };

        activateUser();
    }, [token, navigate]);

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
                                    <h2 className={`title mt-3`}> Abunəliyin ləğv edilməsi </h2>
                                </div>
                                {isTokenValid !== 200 && (
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-3">
                                            <Button to='/'> Ana səhifə </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {submitStatus && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />}
                        </div>
                    </div>
                </Section>
            )}
        </>
    )
}

export default UnsubscriberPage;