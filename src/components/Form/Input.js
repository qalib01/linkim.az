import { useState } from "react";
import classes from './Form.module.scss';
import ShowIconEye from "../Icons/ShowIconEye";
import HideIconEye from "../Icons/HideIconEye";


function Input({ id, error, label, type, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(prevState => !prevState);
    }
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="col-12">
            <div className="position-relative">
                <input id={id} type={inputType} {...props} className={`form-control ${error && 'border border-danger'} ${classes.input}`} />
                {
                    type === 'password' && (
                        <div onClick={toggleShowPassword} className={classes.showHidePasswordIcon}>
                            {
                                showPassword ? <ShowIconEye /> : <HideIconEye />
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