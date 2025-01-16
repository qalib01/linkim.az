import { Link  } from 'react-router-dom';

function Button({ children, to, asButton = false, classList, additionalClasses = '', onClick, ...props }) {
    const Component = asButton ? 'button' : Link;

    return (
        <Component className={`customButton ${classList}`} {...(asButton ? {} : { to })} onClick={typeof onClick === 'function' ? onClick : () => {}} {...props}>
            {children}
        </Component>
    );
}

export default Button;