import ArrowUpIconSvg from '../../Icons/ArrowUpIconSvg';
import classes from './Footer.module.scss';

function ToTop() {
    function toTop() {
        window.scrollTo(0,0)
    }

    return (
        <div className={classes.toTop} onClick={toTop}>
            <ArrowUpIconSvg color='#FFFFFF' />
        </div>
    )
}

export default ToTop;