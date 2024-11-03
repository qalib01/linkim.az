function ListGroupParent({ children, title }) {
    return (
        <>
            { title && <h6 className="text-uppercase text-body text-xs font-weight-bolder"> {title} </h6>}
            <ul className="list-group">
                { children }
            </ul>
        </>
    )
}

export default ListGroupParent;