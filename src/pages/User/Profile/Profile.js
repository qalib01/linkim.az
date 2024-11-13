import { useEffect, useRef, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import { faUserEdit, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import CardHeader from "../../../components/Card/CardHeader";
import CardAction from "../../../components/Card/CardAction";
import CardBody from "../../../components/Card/CardBody";
import Line from "../../../components/Line/Line";
import Button from "../../../components/Button/Button";
import CloseIconSvg from "../../../components/Icons/CloseIconSvg";
import { createPortal } from "react-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserProfile } from "../../../hooks/useUserProfile";


function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState(null);
    const [modalButtons, setModalButtons] = useState([]);
    const { setProfileImgUrl } = useUserProfile();
    const { user } = useAuth();
    const userImgUrl = `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_PHOTO_SERVER_URL}/${user.photo}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function openModal(title, content, size, buttons) {
        setIsOpen(true);
        setModalTitle(title);
        setModalContent(content);
        setModalSize(size);
        setModalButtons(buttons);
        setProfileImgUrl(userImgUrl);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setIsOpen(false);
        setModalTitle('');
        setModalContent(null);
        setModalSize(null);
        setModalButtons([]);
        setProfileImgUrl('');
        document.body.style.overflow = 'visible';
    }

    return (
        <>
            <div className="container-fluid">
                <div className="page-header min-height-300 border-radius-xl mt-4">
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <UserProfileCard classList='blur shadow-blur mx-4 mt-n6 overflow-hidden'>
                    <CardBody>
                        <div className="row gx-4">
                            <div className="col-auto">
                                <CardAction title='Profil şəkili' openModal={() => openModal('Profil şəkili', <ProfilePictureEditForm />, 'md',
                                    [
                                        { label: 'Göndər', classList: 'btn bg-gradient-primary', onClick: () => {} },
                                        { label: 'Bağla', classList: 'btn bg-dark text-white', onClick: () => { closeModal() } },
                                    ],
                                )}>
                                    <div className="avatar-container">
                                        <div className="avatar avatar-xl position-relative">
                                            <img src={userImgUrl} alt="Profil şəkili" className="w-100 border-radius-lg shadow-sm" />
                                        </div>
                                        <div className="edit-icon">
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </div>
                                    </div>
                                </CardAction>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100">
                                    <h5 className="mb-1">
                                        {user.name} {user.surname}
                                    </h5>
                                    <p className="mb-0 font-weight-bold text-sm">
                                        CEO / Co-Founder
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </UserProfileCard>
            </div>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12 col-xl-4">
                        <UserProfileCard>
                            <CardHeader title='Profil məlumatları' >
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-md-4 text-end' openModal={() => openModal('Profil məlumatları', <ProfileEditForm />, 'md',
                                    [
                                        { label: 'Göndər', classList: 'btn bg-gradient-primary', onClick: () => {} },
                                        { label: 'Bağla', classList: 'btn bg-dark text-white', onClick: () => { closeModal() } },
                                    ])
                                } />
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <p className="text-sm">
                                    {user.bio}
                                </p>
                                <Line />
                                <ListGroupParent>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">Tam adı:</strong> &nbsp; {user.name} {user.surname}
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">İstifadəçi adı:</strong> &nbsp; {user.username ? <Link to={`${process.env.REACT_APP_PROJECT_LINK}/${user.username}`}> {user.username} </Link> : 'Məlumat yoxdur'}
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">Email:</strong> &nbsp; {user.email}
                                    </ListGroupItem>
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>

                    <div className="col-12 col-xl-4">
                        <UserProfileCard>
                            <CardHeader title='Linklər'>
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-md-4 text-end' openModal={() => openModal('Linklər', <ProfileLinkEditForm />, 'md',
                                    [
                                        { label: 'Göndər', classList: 'btn bg-gradient-primary', onClick: () => {} },
                                        { label: 'Bağla', classList: 'btn bg-dark text-white', onClick: () => { closeModal() } },
                                    ]
                                )} />
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    {user.userLinks.length > 0 && user.userLinks.map((link) => (
                                        <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' key={link.id}>
                                            <div className="avatar me-3">
                                                <img src="../assets/img/kal-visuals-square.jpg" alt="kal" className="border-radius-lg shadow" />
                                            </div>
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm"> <Link to={link.url} target="_blank"> {link.title} </Link> </h6>
                                                <p className="mb-0 text-xs"> {link.type} </p>
                                            </div>
                                            <Button classList='btn btn-link pe-3 ps-0 mb-0 ms-auto' to='/'> Bax </Button>
                                        </ListGroupItem>
                                    ))}
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>
                </div>
            </div>
            {isOpen && <EditDialogBox onClose={closeModal} title={modalTitle} content={modalContent} size={modalSize} buttons={modalButtons} />}
        </>
    )
}

function EditDialogBox({ onClose, title, content, size = 'lg', buttons }) {
    return createPortal(
        <div className={`modal modal-${size}`} style={{ display: 'inline-block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header" style={{ alignItems: 'unset !important' }}>
                        <h5 className="modal-title"> {title} </h5>
                        <Button asButton={true} classList='btn-close text-dark' onClick={onClose}>
                            <CloseIconSvg />
                        </Button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        {
                            buttons.map((button) => (
                                <button type="button" className={button.classList} onClick={button.onClick}>{button.label}</button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

function ProfileEditForm() {
    return (
        <p>
            Profile Edit Form
        </p>
    )
}

function ProfilePictureEditForm() {
    const { profileImgUrl, setProfileImgUrl } = useUserProfile();
    const fileInputRef = useRef(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImgUrl(imageUrl);
        }
    }

    function handleImageClick() {
        fileInputRef.current.click();
    }

    return (
        <div className="container-fluid">
            <div className="avatar-container mx-auto">
                <div className=" position-relative" onClick={handleImageClick}>
                    <img src={profileImgUrl} alt="Profil şəkili" className="w-100 shadow-sm border" />
                    <input type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                </div>
            </div>
        </div>
    )
}

function ProfileLinkEditForm() {
    return (
        <p>
            Profile Link Edit Form
        </p>
    )
}

export default Profile;