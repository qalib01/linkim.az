import React from "react";

const ListGroupParent = React.forwardRef(({ children, classList, ...props }, ref) => {
    return (
        <ul className={`list-group ${classList}`} ref={ref} {...props}>
            {children}
        </ul>
    )
});

export default ListGroupParent;