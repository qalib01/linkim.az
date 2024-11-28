import { useState } from "react";
import classes from './Form.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function Input({ id, error, label, type, disabled = false, info, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(prevState => !prevState);
    }
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <>
            <div className="position-relative">
                <input id={id} type={inputType} {...props} className={`form-control ${error && 'border border-danger'} ${classes.input}`} disabled={disabled} alt={label} />
                {
                    type === 'password' && (
                        <div onClick={toggleShowPassword} className={classes.showHidePasswordIcon}>
                            {
                                showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </div>
                    )
                }
            </div>
            {info && !error && ( <span className="text-muted" style={{ fontSize: '12px' }}> {info} </span> )}
            {error && <span className="text-danger" style={{ fontSize: '14px', marginTop: '2px' }}> {id === 'confirmPassword' ? `Hər iki şifrə də eyni olmalıdır!` : `Zəhmət olmasa, ${label} hissəsini düzgün daxil edin!`} </span>}
        </>
    )
}

export default Input;