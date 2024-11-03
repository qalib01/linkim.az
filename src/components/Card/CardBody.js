function CardBody({ children, classList }) {
    return (
        <div className={`card-body ${classList}`}>
            {children}
        </div>
    )
}

export default CardBody;