import { useState } from "react";
import Alert from "../../../components/Alert/Alert";
import Modal from "../../../components/Modal/Modal";
import UserLinks from "./components/UserLinks";
import UserSubscription from "./components/UserSubscription";
import UserData from "./components/UserData";
import UserPhoto from "./components/UserPhoto";
import PropTypes from "prop-types";
import Form from "../../../components/Form/Form";
import UserCover from "./components/UserCover";
import { ConfigGenerator } from "../../../utils/formConfigs";


function Profile({ user, setUser }) {
    const [submitStatus, setSubmitStatus] = useState([]);
    const [modalConfig, setModalConfig] = useState({});
    const [currentConfig, setCurrentConfig] = useState({});
    const configGenerator = new ConfigGenerator();
    const [formKey, setFormKey] = useState(0);

    function handleConfigChange(newConfig) {
        setCurrentConfig({ config: configGenerator.generateUserCoverData(newConfig, user.id) });
        setFormKey(prevSate => prevSate + 1);
    }

    function handleOpenModal(title, size, content) {
        document.body.style.overflow = 'hidden';
        setCurrentConfig({ config: content.config, initialData: content.initialData });
        setModalConfig({ isOpen: true, title, size });
    }

    function handleCloseModal() {
        document.body.style.overflow = 'visible';
        setModalConfig({});
    }

    return (
        <>
            <div className="container-fluid">
                <UserCover user={user} openModal={handleOpenModal} />
                <UserPhoto user={user} openModal={handleOpenModal} closeModal={handleCloseModal} />
            </div>

            <div className="container-fluid py-4">
                <div className="row" style={{ rowGap: '1rem' }}>
                    <UserData user={user} openModal={handleOpenModal} setSubmitStatus={setSubmitStatus} />
                    <UserLinks user={user} setUser={setUser} openModal={handleOpenModal} setSubmitStatus={setSubmitStatus} />
                    <UserSubscription user={user} openModal={handleOpenModal} submitStatus={submitStatus} setSubmitStatus={setSubmitStatus} />
                </div>
            </div>
            {submitStatus && (
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
            {modalConfig?.isOpen && (
                <Modal title={modalConfig.title} size={modalConfig.size} onClose={handleCloseModal}>
                    <Form key={formKey} config={currentConfig.config} initialData={currentConfig.initialData} onClose={handleCloseModal} onConfigChange={handleConfigChange} />
                </Modal>
            )}
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Profile;