import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Footer.module.scss';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function ToTop() {
    function toTop() {
        window.scrollTo(0,0)
    }

    return (
        <div className={classes.toTop} onClick={toTop}>
            <FontAwesomeIcon icon={faAngleUp} color='#fff' />
        </div>
    )
}

export default ToTop;