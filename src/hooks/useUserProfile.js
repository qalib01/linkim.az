import { useContext } from "react";
import UserProfileContext from "../context/UserProfileProvider";

export function useUserProfile() {
    return useContext(UserProfileContext);
}