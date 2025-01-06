import useAuth from "../../../hooks/useAuth"
import Profile from "./Profile";

const LoggedInUser = () => {
    const { localUser } = useAuth();
    return <Profile user={localUser} />
}

export default LoggedInUser;