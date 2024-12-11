import classes from './Form.module.scss';

function Textarea({ id, error, label, maxLength, value, ...props }) {
    return (
        <div className="col-12">
            <textarea id={id} maxLength={maxLength} {...props} title={label} value={value} className={`form-control ${error && 'border border-danger'} ${classes.textarea}`}></textarea>
            { error && <span className="text-danger" style={{ fontSize: '14px' }}> { value.trim().length <= maxLength ? `Zəhmət olmasa, ${label} hissəsini düzgün daxil edin!` : `Maksimum xarakter limiti ${maxLength} olmalıdır!` } </span> }
            { maxLength ? <p className='text-sm mt-1 text-end mb-0'> Hərf sayı: <span className='text-bold'> {value.trim().length} / {maxLength} </span> </p> : '' }
        </div>
    )
}

export default Textarea;