import { createContext, useState } from "react";

const UserProfileContext = createContext();

export function UserProfileProvider({children}) {
    const [profileImgUrl, setProfileImgUrl] = useState('');

    return <UserProfileContext.Provider value={{ profileImgUrl, setProfileImgUrl }}>{children}</UserProfileContext.Provider>
}

export default UserProfileContext;