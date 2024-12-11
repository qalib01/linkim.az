import classes from './Form.module.scss';

function Select({ id, error, label, children, ...props }) {
    return (
        <>
            <select id={id} {...props} className={`form-control ${error && 'border border-danger'} ${classes.select}`}>
                {children}
            </select>
            {error && <span className="text-danger" style={{ fontSize: '14px' }}> Zəhmət olmasa, {label} hissəsini düzgün daxil edin! </span>}
        </>
    )
}

export default Select;