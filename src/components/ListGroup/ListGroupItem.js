function ListGroupItem({children, classList}) {
    return (
        <li className={`list-group-item ${classList}`}>
            { children }
        </li>
    )
}

export default ListGroupItem;