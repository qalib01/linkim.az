import Section from "../Section/Section";

function Hero({ sectionName, sectionBg, order = 1, children }) {
    return (
        <Section sectionName={sectionName} sectionBg={sectionBg}>
            <div className="row align-items-center">
                <div className={`col-md-12 col-lg-6 order-${order} mt-4 mt-lg-0 pt-4 pt-lg-0`}>
                    <div className={`content pe-md-0 pe-lg-5`}>
                        { children }
                    </div>
                </div>
                <div className={`col-md-12 col-lg-6 order-${ order === 1 ? 2 : 1 }`}>
                    {/* <div className={`${classes.heroImage} wings position-relative mx-3 mx-md-4 ms-lg-5`}>
                        <img className="rounded img-fluid w-100 position-relative" src="assets/images/hero.jpg" alt="Hero" />
                    </div> */}
                </div>
            </div>
        </Section>
    )
}

export default Hero;