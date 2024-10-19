import { useState } from "react";
import classes from './Form.module.scss';
import ShowIconSvg from "../Icons/ShowIconSvg";
import HideIconSvg from "../Icons/HideIconSvg";


function Input({ id, error, label, type, disabled=false, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(prevState => !prevState);
    }
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="col-12">
            <div className="position-relative">
                <input id={id} type={inputType} {...props} className={`form-control ${error && 'border border-danger'} ${classes.input}`} disabled={disabled} readOnly={disabled} />
                {
                    type === 'password' && (
                        <div onClick={toggleShowPassword} className={classes.showHidePasswordIcon}>
                            {
                                showPassword ? <ShowIconSvg /> : <HideIconSvg />
                            }
                        </div>
                    )
                }
            </div>
            { error && <span className="text-danger" style={{ fontSize: '14px' }}> { id === 'confirmPassword' ? `Hər iki şifrə də eyni olmalıdır!` : `Zəhmət olmasa, ${label} hissəsini düzgün daxil edin!` } </span> }
        </div>
    )
}

export default Input;