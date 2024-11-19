import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Section from "../../../components/Section/Section";
import Button from "../../../components/Button/Button";


function ActivateUserPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
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
            url: `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_ACTIVATE_LINK_KEY}`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: { token },
        });

        if (response.status === 200) {
            navigate('/p/login');
            setIsTokenValid(true);
        } else {
            setSubmitStatus(response.data);
        }
        setLoading(false);
    }

    return (
        <>
            {loading && (<Loader />)}
            {!loading && <Section sectionName='activate-user' sectionBg='bgTransparent'>
                <div className="row gy-4" style={{ margin: '100px 0' }}>
                    <div className="m-auto">
                        <div className="text-center">
                            <div className={`${classes.content} pe-md-0 mb-5`}>
                                <h2 className={`title mt-3`}> Hesabını aktifləşdir </h2>
                            </div>
                            {!isTokenValid && (
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-4">
                                        <Button to='/p/login'> Giriş </Button>
                                    </div>
                                    <div className="col-12 col-md-4">
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

export default ActivateUserPage;