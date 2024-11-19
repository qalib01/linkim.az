import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Accordion.module.scss';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Accordion({header, body}) {
    const [showItem, setShowItem] = useState(false);

    function toggleShowItem() {
        setShowItem(prevState => !prevState)
    }

    return (
        <div className={classes.accordionItem}>
            <div className={classes.accordionHeader} onClick={toggleShowItem}>
                <p>{header}</p>
                {showItem ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
            </div>
            {
                showItem && <div className={classes.accordionBody}>
                    <p>{body}</p>
                </div>
            }
        </div>
    )
}

export default Accordion;