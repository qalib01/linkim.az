import { Link } from "react-router-dom";
import Error from "../../../error/IndexErrorPage";

function UserLinks() {
    return (
        <Error />
    )
}

function UserLink({ link, label }) {
    return (
        <div className="">
            <Link to={ link }> { label } </Link>
        </div>
    )
}

export default UserLinks;