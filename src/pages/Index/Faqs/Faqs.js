import classes from './Faqs.module.scss';
import { useCallback, useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { apiRequest } from '../../../utils/apiRequest';
import Accordion from '../../../components/Accordion/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../../utils/routes';


function FaqPage() {
    const [groups, setGroups] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getAllFaqs = async () => {
            setIsFetching(true);

            try {
                const response = await apiRequest({ url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.GLOBAL_ENDPOINT}${ROUTES.API.FAQS}` });
                setGroups(response.status === 200 && response.data);
            } catch (error) {
                console.error(error)
            } finally {
                setIsFetching(false);
            }
        }

        getAllFaqs();
    }, []);

    const handleSelect = useCallback((id) => {
        const group = groups.find((group) => group.id === id);
        setFaqs(group.faqs)
    }, [setFaqs, groups])

    return (
        <Section sectionName='faq' sectionBg='bgCoralOrange'>
            <div className="row flex-column" style={{ margin: '100px 0px' }}>
                <div className="col">
                    <div className="section-head text-center mx-auto narrow mb-5">
                        <h1 className={classes.title}> Sualların var? </h1>
                    </div>
                </div>
                <div className='row mb-5 m-0'>
                    {isFetching && <p> Məlumatlar yüklənir! </p>}
                    {
                        !isFetching && groups.length > 0 ? groups.map((group) => (
                            <div key={group.id} className='col-md-3 col-lg-3'>
                                <div className='rounded overflow-hidden mb-2'>
                                    <div className='bg-warning p-4 text-center font-weight-bold cursor-pointer' onClick={() => handleSelect(group.id)}>
                                        <span> {group.name} </span>
                                    </div>
                                </div>
                            </div>
                        )) : <p> Məlumat tapılmadı! </p>
                    }
                </div>
                <div className={`${classes.faqBody} mb-5`}>
                    {
                        !isFetching && faqs.map((faq) => (
                            <Accordion key={faq.id} header={faq.question} body={faq.answer} />
                        ))
                    }
                </div>
                <div className='col'>
                    <div className='text-center mb-5'>
                        <h2 className='text-capitalize'> Hələ də sualların var? </h2>
                        <span> Aşağıda qeyd olunan linklərdən bizimlə əlaqə saxlaya bilərsən! </span>
                    </div>
                    <div className='row justify-content-evenly flex-wrap'>
                        <div className='col-md-3 col-lg-4 text-center mb-3 bg-warning p-4 d-flex flex-column rounded'>
                            <FontAwesomeIcon icon={faPhoneAlt} className='h2 m-0 mb-3' />
                            <a href="tel:+994507038481" className='font-weight-bold text-dark'> +994 (50) 703 84 81 </a>
                            <span> Mobil nömrəmiz </span>
                        </div>
                        <div className='col-md-3 col-lg-4 text-center mb-3 bg-warning p-4 d-flex flex-column rounded'>
                            <FontAwesomeIcon icon={faEnvelope} className='h2 m-0 mb-3' />
                            <a href="mailto:support@linkim.az" className='font-weight-bold text-dark'> support@linkim.az </a>
                            <span> Email adresimiz </span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default FaqPage;