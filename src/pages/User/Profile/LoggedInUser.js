import useAuth from "../../../hooks/useAuth"
import Profile from "./Profile";

const LoggedInUser = () => {
    const { localUser, setLocalUser } = useAuth();
    return <Profile user={localUser} setUser={setLocalUser} />
}

export default LoggedInUser;