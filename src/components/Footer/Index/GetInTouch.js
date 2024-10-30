import classes from './Footer.module.scss'
import Button from '../../Button/Button';

function GetInTouch() {
    return (
        <section className={`${classes.cta} section bg-dark position-relative pb-5`}>
            <svg className={classes.ctaImage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className={classes.ctaContent}>
                            <h3 className={`${classes.ctaTitle} text-white`}> Bizimlə əlaqə saxla </h3>
                            <p className="cta-text text-muted mt-3"> Əlavə sualın və ya aramıza qatılmaq üçün bizimlə əlaqə saxla, komandamız bütün suallarını cavablamağa hazırdır </p>
                            <Button to='/p/contact'>İndi başla</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetInTouch;