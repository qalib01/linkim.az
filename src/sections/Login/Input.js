function Input({ id, error, ...props }) {
    return (
        <div className="col-12">
            <input id={id} {...props} className={`form-control ${error ? 'border border-danger' : null}`} />
        </div>
    )
}

export default Input;