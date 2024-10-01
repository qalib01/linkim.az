import { useState } from "react";
import showIcon from './showIcon.svg';
import hideIcon from './hideIcon.svg';
import classes from './Form.module.scss'

function Input({ id, error, label, type, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(prevState => !prevState);
    }

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="col-12">
            <div className="position-relative">
                <input id={id} type={inputType} {...props} className={`form-control ${error && 'border border-danger'}`} />
                {
                    type === 'password' && (
                        <img onClick={toggleShowPassword} src={showPassword ? showIcon : hideIcon} className={classes.showHidePasswordIcon} alt="Show/Hide button" />
                    )
                }
            </div>
            { error && <span className="text-danger" style={{ fontSize: '14px' }}> Zəhmət olmasa, {label} hissəsini düzgün daxil edin! </span> }
        </div>
    )
}

export default Input;