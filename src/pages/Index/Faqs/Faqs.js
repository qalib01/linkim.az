import classes from './Faqs.module.scss';
import ArrowDownIconSvg from "../../../components/Icons/ArrowDownIconSvg";
import { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import ArrowUpIconSvg from '../../../components/Icons/ArrowUpIconSvg';
import { fetchFaqs } from '../../../utils/http';


function Faqs() {
    const [faqs, setFaqs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function allFaqs() {
            setIsFetching(true);
            try {
                const data = await fetchFaqs();
                setFaqs(data);
            } catch (error) {
                setError(error)
            }
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
                    {isFetching && <p> Məlumatlar yüklənir! </p>}
                    {!isFetching && faqs.length === 0 && <p> Hal-hazırda heç bir məlumat yoxdur! </p>}
                    {!isFetching && error && <p> Gözlənilməz xəta baş verib, xahiş olunur ki, daha sonra yenidən yoxlayasan! </p>}
                    {
                        !isFetching && faqs.length > 0 && faqs.map((data) => (
                            <Faq key={data.id} data={data} />
                        ))
                    }
                </div>
            </div>
        </Section>
    )
}

function Faq({ data }) {
    const [showFaq, setShowFaq] = useState(false);

    function toggleShowFaq() {
        setShowFaq(prevState => !prevState)
    }

    return (
        <div className={classes.faqItem}>
            <div className={classes.faqQuestion} onClick={toggleShowFaq}>
                <p>{data.question}</p>
                {showFaq ? <ArrowUpIconSvg color='#F5ADA6' /> : <ArrowDownIconSvg color='#F5ADA6' />}
            </div>
            {
                showFaq && <div className={classes.faqAnswer}>
                    <p>{data.answer}</p>
                </div>
            }
        </div>
    )
}

export default Faqs;