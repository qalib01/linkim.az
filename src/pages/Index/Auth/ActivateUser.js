import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import classes from './Auth.module.scss';
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Section from "../../../components/Section/Section";


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
        let data = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/activate`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: { token },
        });
        console.log(data)

        if (data.type === 'success') {
            navigate('/p/login');
            setIsTokenValid(true);
        } else {
            setSubmitStatus({ type: 'error', message: 'Link etibarsızdır.' });
        }
        setLoading(false);
    }

    return (
        <>
            {loading && (<Loader />)}
            {!loading && <Section sectionName='activate-user' sectionBg='bgTransparent'>
                <div className="row gy-4" style={{ margin: '100px 0' }}>
                    <div className="col-12 m-auto">
                        <div className="row text-center">
                            <div className={`${classes.content} pe-md-0 pe-lg-5  mb-5`}>
                                <h2 className={`title mt-3`}> Hesabını aktifləşdir </h2>
                            </div>
                        </div>
                        {!isTokenValid && (
                            <p>Token etibarsızdır və ya müddəti keçib.</p>
                        )}
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