import { useParams } from "react-router";
import Profile from "./Profile";
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import errorMessages from "../../../statusMessages/error";
import { useEffect, useState } from "react";
import Alert from "../../../components/Alert/Alert";

const EditableUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [submitStatus, setSubmitStatus] = useState([]);
    const [hasAlert, setHasAlert] = useState(false);

    useEffect(() => {
        async function getData() {
            setIsFetching(true);
            try {
                const response = await apiRequest({
                    url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-selectedUser/${id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setSubmitStatus(response.data);
                }
            } catch (err) {
                setSubmitStatus(errorMessages.GENERAL_ERROR);
            } finally {
                setIsFetching(false);
            }
        }
        getData();
    }, [id]);

    if (submitStatus.length > 0) return hasAlert && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setHasAlert(false)} />;
    if (isFetching || !user) return <Loader />;
    return <Profile user={user} />;
}

export default EditableUser;