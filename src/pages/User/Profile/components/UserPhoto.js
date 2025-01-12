import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardBody from "../../../../components/Card/CardBody";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Form from "../../../../components/Form/Form";


function UserPhoto({ user, onClose, openModal }) {
    const userImgUrl = `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_PHOTO_SERVER_URL}/${user.photo}`;

    return (
        <UserProfileCard classList='blur shadow-blur mx-4 mt-n6 overflow-hidden'>
            <CardBody>
                <div className={`row gx-4 ${window.innerWidth <= 425 ? 'align-items-center flex-column' : ''}`}>
                    <div className="col-auto">
                        <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => openModal('İstifadəçi şəklini dəyiş', 'md', <Form config={new ConfigGenerator().generateUserPhoto('update', user.id)} initialData={user} onClose={onClose} />)} style={{ fontSize: '16px' }}>
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

export default UserPhoto;