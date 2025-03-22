import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import PropTypes from "prop-types";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";


function UserCover({ user, openModal }) {
    const configGenerator = new ConfigGenerator();
    const defaultCoverConfig = configGenerator.chooseUserCoverOption();
    const coverColor = user.userCover.find(cover => cover.type === 'color');

    return (
        <Button
            classList="border-0 bg-transparent w-100 position-relative"
            asButton={true}
            onClick={() => openModal('Qapaq məlumatlarını dəyiş', 'md', { config: defaultCoverConfig, initialData: user })}
            style={{ fontSize: '16px' }}
        >
            <div className="cover-container">
                <div className="page-header min-height-300 border-radius-xl mt-4">
                    <span className="mask opacity-10" style={{ backgroundColor: coverColor.data }}></span>
                </div>
                <div className="edit-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </div>
            </div>
        </Button>
    );
}

UserCover.propTypes = {
    user: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default UserCover;