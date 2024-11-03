function UserProfileCard({ children, classList }) {
    return (
        <div className={`card h-100 ${classList}`}>
            {children}
        </div>
    )
}

export default UserProfileCard;