function UserProfileCard({ title, children }) {
    return (
        <div className="col-12 col-xl-4">
            <div className="card h-100">
                <div className="card-header pb-0 p-3">
                    <h6 className="mb-0"> {title} </h6>
                </div>
                <div className="card-body p-3">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default UserProfileCard;