import React from "react";

const ListGroupItem = React.forwardRef(({ children, classList, ...props }, ref) => {
    return (
        <li className={`list-group-item ${classList}`} ref={ref} {...props}>
            {children}
        </li>
    )
});

export default ListGroupItem;