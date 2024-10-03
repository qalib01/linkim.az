import classes from './Faqs.module.scss';
import ArrowDownIconSvg from "../../../components/Icons/ArrowDownIconSvg";
import { useState } from "react";
import Section from "../../../components/Section/Section";


const FAQ_DATA = [
    {
        id: 1,
        question: 'Why do I need a link in bio tool?',
        answer: 'Right now, every time you’ve got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It’s time-consuming and complicated – making it so much harder to keep everything up to date. A link in bio tool means you never have to compromise, or remove one link from your bio so you can add another. You can keep everything you want to share online in one link. When you’ve got a change, you only ever have to make it once.',
    },
    {
        id: 2,
        question: 'Why do I need a link in bio tool?',
        answer: 'Right now, every time you’ve got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It’s time-consuming and complicated – making it so much harder to keep everything up to date. A link in bio tool means you never have to compromise, or remove one link from your bio so you can add another. You can keep everything you want to share online in one link. When you’ve got a change, you only ever have to make it once.',
    },
    {
        id: 3,
        question: 'Why do I need a link in bio tool?',
        answer: 'Right now, every time you’ve got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It’s time-consuming and complicated – making it so much harder to keep everything up to date. A link in bio tool means you never have to compromise, or remove one link from your bio so you can add another. You can keep everything you want to share online in one link. When you’ve got a change, you only ever have to make it once.',
    },
    {
        id: 4,
        question: 'Why do I need a link in bio tool?',
        answer: 'Right now, every time you’ve got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It’s time-consuming and complicated – making it so much harder to keep everything up to date. A link in bio tool means you never have to compromise, or remove one link from your bio so you can add another. You can keep everything you want to share online in one link. When you’ve got a change, you only ever have to make it once.',
    }
]

function Faqs() {
    return (
        <Section sectionName='faq' sectionBg='bgCoralOrange'>
            <div className="row flex-column" style={{ margin: '100px 0px' }}>
                <div className="col">
                    <div className="section-head text-center mx-auto narrow" style={{ marginBottom: '40px' }}>
                        <h6 className={classes.title}> Sualların var? </h6>
                    </div>
                </div>
                <div className={classes.faqBody}>
                    {
                        FAQ_DATA.map((data) => (
                            <Faq data={data} />
                        ))
                    }
                </div>
            </div>
        </Section>
    )
}

function Faq({data}) {
    const [showFaq, setShowFaq] = useState(false);

    function toggleShowFaq() {
        setShowFaq(prevState => !prevState)
    }


    return (
        <div key={data.id} className={classes.faqItem}>
            <div className={classes.faqQuestion} onClick={toggleShowFaq}>
                <p>{data.question}</p>
                <ArrowDownIconSvg color='#F5ADA6' />
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