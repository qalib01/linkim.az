import { Link  } from 'react-router-dom';
// import classes from './Button.module.scss';

function Button({ children, to, asButton = false, additionalClasses = '', ...props }) {
    const Component = asButton ? 'button' : Link;

    return (
        <Component className='customButton' {...(asButton ? {} : { to })} {...props}>
            {children}
        </Component>
    );
}

export default Button;