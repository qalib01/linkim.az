import { Link  } from 'react-router-dom';
import classes from './Button.module.scss';

function Button({ children, to, asButton = false, additionalClasses, ...props }) {
    if (asButton) {
        return (
            <button className={`${classes.customButtons}` `${additionalClasses}`} {...props}>
                {children}
            </button>
        );
    }

    return (
        <Link to={to} className={`${classes.customButtons}` `${additionalClasses}`} {...props}>
            {children}
        </Link>
    );
}

export default Button;