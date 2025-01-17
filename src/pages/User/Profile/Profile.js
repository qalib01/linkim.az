import { useEffect, useState } from "react";
import Alert from "../../../components/Alert/Alert";
import Modal from "../../../components/Modal/Modal";
import UserLinks from "./components/UserLinks";
import UserSubscription from "./components/UserSubscription";
import UserData from "./components/UserData";
import UserPhoto from "./components/UserPhoto";
import PropTypes from "prop-types";


function Profile({ user, setUser }) {
    const [submitStatus, setSubmitStatus] = useState([]);
    const [modalConfig, setModalConfig] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handleOpenModal(title, size, content) {
        document.body.style.overflow = 'hidden';
        setModalConfig({ isOpen: true, title, size, content });
    }

    function handleCloseModal() {
        document.body.style.overflow = 'visible';
        setModalConfig({ ...modalConfig, isOpen: false });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="page-header min-height-300 border-radius-xl mt-4">
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <UserPhoto user={user} onClose={handleCloseModal} openModal={handleOpenModal} />
            </div>
            <div className="container-fluid py-4">
                <div className="row" style={{ rowGap: '1rem' }}>
                    <UserData user={user} onClose={handleCloseModal} openModal={handleOpenModal} setSubmitStatus={setSubmitStatus} />
                    <UserLinks user={user} setUser={setUser} onClose={handleCloseModal} openModal={handleOpenModal} setSubmitStatus={setSubmitStatus} />
                    <UserSubscription user={user} onClose={handleCloseModal} openModal={handleOpenModal} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />
                </div>
            </div>
            {submitStatus.type && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus([])} />}
            {modalConfig?.isOpen && (<Modal title={modalConfig.title} size={modalConfig.size} onClose={handleCloseModal}> {modalConfig.content} </Modal>)}
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Profile;