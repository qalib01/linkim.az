import React from "react";

const ListGroupParent = ({ children, classList, ...props }) => {
    return (
        <ul className={`list-group ${classList}`} {...props}>
            {children}
        </ul>
    )
}

export default ListGroupParent;