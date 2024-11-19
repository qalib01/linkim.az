import classes from './Faqs.module.scss';
import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import { apiRequest } from '../../../utils/apiRequest';
import Accordion from '../../../components/Accordion/Accordion';


function Faqs() {
    const [faqs, setFaqs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function allFaqs() {
            setIsFetching(true);
            const response = await apiRequest({ url: `${process.env.REACT_APP_API_LINK}/faqs` });
            setFaqs(response.data);
            setIsFetching(false);
        }
        allFaqs();
    }, []);

    return (
        <Section sectionName='faq' sectionBg='bgCoralOrange'>
            <div className="row flex-column" style={{ margin: '100px 0px' }}>
                <div className="col">
                    <div className="section-head text-center mx-auto narrow" style={{ marginBottom: '40px' }}>
                        <h6 className={classes.title}> Sualların var? </h6>
                    </div>
                </div>
                <div className={classes.faqBody}>
                    { isFetching && <p> Məlumatlar yüklənir! </p> }
                    { (faqs.length === 0) && <p> Hal-hazırda heç bir məlumat yoxdur! </p> }
                    {
                        !isFetching && faqs.length > 0 && faqs.map((data) => (
                            <Accordion key={data.id} header={data.question} body={data.answer} />
                        ))
                    }
                </div>
            </div>
        </Section>
    )
}

export default Faqs;