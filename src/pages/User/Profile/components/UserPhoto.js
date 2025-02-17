import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardBody from "../../../../components/Card/CardBody";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { ROUTES } from "../../../../utils/routes";


function UserPhoto({ user, openModal }) {
    const configGenerator = new ConfigGenerator();
    const userImgUrl = `${process.env.REACT_APP_API_LINK}${ROUTES.API.PHOTO_URL}${user.photo}`;

    return (
        <UserProfileCard classList='blur shadow-blur mx-4 mt-n6 overflow-hidden'>
            <CardBody>
                <div className={`row gx-4 ${window.innerWidth <= 425 ? 'align-items-center flex-column' : ''}`}>
                    <div className="col-auto">
                        <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => openModal('İstifadəçi şəklini dəyiş', 'md', { config: configGenerator.generateUserPhoto('update', user.id), initialData: user })} style={{ fontSize: '16px' }}>
                            <div className="avatar-container">
                                <div className={`avatar ${window.innerWidth > 425 ? 'avatar-xl' : 'avatar-xxl'} position-relative`}>
                                    <img src={userImgUrl} alt="Profil şəkili" className="border-radius-lg shadow-sm" />
                                </div>
                                <div className="edit-icon">
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </div>
                            </div>
                        </Button>
                    </div>
                    <div className="col-auto my-auto">
                        <div className="h-100">
                            <h5 className="mb-1">
                                {user.name} {user.surname}
                            </h5>
                            {/* <p className="mb-0 font-weight-bold text-sm">
                                CEO / Co-Founder
                            </p> */}
                        </div>
                    </div>
                </div>
            </CardBody>
        </UserProfileCard>
    )
}

UserPhoto.propTypes = {
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default UserPhoto;