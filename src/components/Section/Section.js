import classes from './Section.module.scss'

function Section({ sectionName, sectionBg, children }) {
    return (
        <section className={`${ classes.section } ${ sectionName } ${ sectionBg !== null && sectionBg !== undefined ? classes[sectionBg] : classes.bgTransparent } `}>
            <div className="container">
                { children }
            </div>
        </section>
    )
}

export default Section;