import classes from './Section.module.scss'

function Section({ sectionName, sectionBg, children }) {
    const bgClass = sectionBg ? sectionBg : 'bgTransparent';

    return (
        <section className={`${ classes.section } ${ sectionName } ${ bgClass }`}>
            <div className="container">
                { children }
            </div>
        </section>
    )
}

export default Section;