import { redirect } from "react-router";

function logoutAction() {
    localStorage.removeItem('lToken');
    localStorage.removeItem('expiration');
    return redirect('/')
}

export default logoutAction;