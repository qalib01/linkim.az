import { forwardRef, useState } from "react";
import classes from './Form.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Input = forwardRef(({ id, error, label, type, value, maxLength, info, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prevState => !prevState);
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <>
            <div className="position-relative">
                <input id={id} type={inputType} {...props} className={`form-control ${error && 'border border-danger'} ${classes.input}`} ref={ref} alt={label} aria-describedby={`${id}-info`} value={value} maxLength={maxLength} />
                {
                    type === 'password' && (
                        <div onClick={toggleShowPassword} className={classes.showHidePasswordIcon} role="button" aria-label="Şifrəni göstər/gizlət">
                            {
                                showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
                            }
                        </div>
                    )
                }
            </div>
            {info && !error && (<span className="text-muted" style={{ fontSize: '12px' }}> {info} </span>)}
            {error && <span className="text-danger" style={{ fontSize: '14px', marginTop: '2px' }}> {id === 'confirmPassword' ? `Hər iki şifrə də eyni olmalıdır!` : `Zəhmət olmasa, ${label} hissəsini düzgün daxil edin!`} </span>}
            {maxLength ? <p className='text-sm mt-1 text-end mb-0'> Hərf sayı: <span className='text-bold'> {value.trim().length} / {maxLength} </span> </p> : ''}
        </>
    )
})

export default Input;