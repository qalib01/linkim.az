import { apiRequest } from "../utils/apiRequest";
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        let res = await apiRequest({ url: 'http://localhost:1007/refresh' });
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(res.data);
            // return { ...prev } //, burda art;q yeni gələn daha qeyd olunacaq 
        });
        // return burda da yuxarıda qeyd olunan data qeyd olunacaq 17:28 - 4th video
    }

    return refresh;
}

export default useRefreshToken;