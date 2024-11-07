import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider =  ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;