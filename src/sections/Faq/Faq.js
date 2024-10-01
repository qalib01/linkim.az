import { useState } from 'react';
import DownArrowSvgFile from './arrow-down.svg';
import classes from './Faq.module.scss';


function Faq({data}) {
    const [showFaq, setShowFaq] = useState(false);

    function toggleShowFaq() {
        setShowFaq(prevState => !prevState)
    }


    return (
        <div key={data.id} className={classes.faqItem}>
            <div className={classes.faqQuestion} onClick={toggleShowFaq}>
                <p>{data.question}</p>
                <img src={DownArrowSvgFile} alt={data.question} />
            </div>
            {
                showFaq && <div className={classes.faqAnswer}>
                <p>{data.answer}</p>
            </div>
            }
        </div>
    )
}

export default Faq;