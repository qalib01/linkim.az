import { createContext, useState } from "react";

const SideNavContext = createContext();

export function SideNavProvider({children}) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    return <SideNavContext.Provider value={{ isSideNavOpen, setIsSideNavOpen }}>{children}</SideNavContext.Provider>
}

export default SideNavContext;