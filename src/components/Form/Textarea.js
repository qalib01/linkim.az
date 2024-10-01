function Textarea({ id, error, label, ...props }) {
    return (
        <div className="col-12">
            <textarea id={id} {...props} className={`form-control ${error && 'border border-danger'}`}></textarea>
            { error && <span className="text-danger" style={{ fontSize: '14px' }}> Zəhmət olmasa, {label} hissəsini düzgün daxil edin! </span> }
        </div>
    )
}

export default Textarea;