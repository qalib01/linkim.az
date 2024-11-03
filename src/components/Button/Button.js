import { Link  } from 'react-router-dom';

function Button({ children, to, asButton = false, classList, additionalClasses = '', ...props }) {
    const Component = asButton ? 'button' : Link;

    return (
        <Component className={`customButton ${classList}`} {...(asButton ? {} : { to })} {...props}>
            {children}
        </Component>
    );
}

export default Button;