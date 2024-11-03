function CardHeader({ title, children }) {
    return (
        <div className="card-header pb-0 p-3">
            <div className="row">
                <div className="col-md-8 d-flex align-items-center">
                    <h6 className="mb-0"> {title} </h6>
                </div>
                { children }
            </div>
        </div>
    )
}



export default CardHeader;