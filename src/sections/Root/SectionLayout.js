import classes from './Section.module.scss'

function SectionLayout({ sectionName, sectionBg, children }) {
    return (
        <section className={`${ classes.section } ${ sectionName } ${ classes[sectionBg] } `}>
            <div className="container">
                { children }
            </div>
        </section>
    )
}

export default SectionLayout;