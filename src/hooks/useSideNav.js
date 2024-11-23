import { useContext } from "react"
import SideNavContext from "../context/SideNavProvider"

const useSideNav = () => {
    return useContext(SideNavContext);
}

export default useSideNav;