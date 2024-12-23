import { useEffect, useRef, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import CardHeader from "../../../components/Card/CardHeader";
import CardAction from "../../../components/Card/CardAction";
import CardBody from "../../../components/Card/CardBody";
import Line from "../../../components/Line/Line";
import Button from "../../../components/Button/Button";
import useAuth from "../../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faPencilAlt, faEdit, faTrash, faLink, faAdd, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useUserProfile } from "../../../hooks/useUserProfile";
import { apiRequest } from "../../../utils/apiRequest";
import Alert from "../../../components/Alert/Alert";
import errorMessages from "../../../statusMessages/error";
import CopyToClipboard from "react-copy-to-clipboard";
import infoMessages from "../../../statusMessages/info";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";
import Modal from "../../../components/Modal/Modal";
import Loader from "../../../components/Loader/Loader";


function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState(null);
    const [submitStatus, setSubmitStatus] = useState([]);
    const { setProfileImgUrl } = useUserProfile();
    const [hasAlert, setHasAlert] = useState(false);
    const { localUser } = useAuth();
    const { id } = useParams();
    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState({});
    const userImgUrl = `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_PHOTO_SERVER_URL}/${user.photo}`;

    useEffect(() => {
        window.scrollTo(0, 0);
        if(!id) return setUser(localUser);

        async function getData() {
            setIsFetching(true);
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-selectedUser/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
            });

            let data = response.data;
            if (response.status === 200 && data) {
                setUser(data)
            } else {
                setSubmitStatus(data);
            }
            setIsFetching(false);
        }
        getData();
    }, [id, localUser]);

    function openModal(title, content, size) {
        setIsOpen(true);
        setModalTitle(title);
        setModalContent(content);
        setModalSize(size);
        setProfileImgUrl(userImgUrl);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setIsOpen(false);
        setModalTitle('');
        setModalContent(null);
        setModalSize(null);
        setProfileImgUrl('');
        document.body.style.overflow = 'visible';
    }

    function onCopyText() {
        setHasAlert(true);
        setSubmitStatus(infoMessages.LINK_COPIED);
    }

    function onUserUpToLimit() {
        setHasAlert(true);
        setSubmitStatus(errorMessages.USER_UP_TO_LINK_LIMIT);
    }

    return (
        <>
            { isFetching && <Loader /> }
            <div className="container-fluid">
                <div className="page-header min-height-300 border-radius-xl mt-4">
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <UserProfileCard classList='blur shadow-blur mx-4 mt-n6 overflow-hidden'>
                    <CardBody>
                        <div className={`row gx-4 ${window.innerWidth <= 425 ? 'align-items-center flex-column' : ''}`}>
                            <div className="col-auto">
                                <CardAction title='Profil şəkili' openModal={() => openModal('Profil şəkili', <ProfilePictureEditForm onClose={closeModal} />, 'md')}>
                                    <div className="avatar-container">
                                        <div className={`avatar ${window.innerWidth > 425 ? 'avatar-xl' : 'avatar-xxl'} position-relative`}>
                                            <img src={userImgUrl} alt="Profil şəkili" className="border-radius-lg shadow-sm" />
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
                                    {/* <p className="mb-0 font-weight-bold text-sm">
                                        CEO / Co-Founder
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </UserProfileCard>
            </div>
            <div className="container-fluid py-4">
                <div className="row" style={{ rowGap: '1rem' }}>
                    <div className="col-12 col-xl-4">
                        <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                            <CardHeader title='Profil məlumatları'>
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-6 text-end' openModal={() => openModal('Profil məlumatları', <Form config={new ConfigGenerator().generateUserData('update', user.id)} initialData={user} onClose={closeModal} />, 'lg')} />
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
                                        <strong className="text-dark">İstifadəçi adı:</strong> &nbsp; {user.username ?
                                            <>
                                                <Link to={`${process.env.REACT_APP_PROJECT_LINK}/${user.username}`}> {user.username} </Link>
                                                <CopyToClipboard text={`${process.env.REACT_APP_PROJECT_LINK}/${user.username}`} onCopy={onCopyText}>
                                                    <FontAwesomeIcon icon={faCopy} size="lg" className="mx-2 cursor-pointer move-on-hover" title="Yaddaşda saxlamaq üçün klikləyin" />
                                                </CopyToClipboard>
                                            </>
                                            : 'Məlumat yoxdur'}
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">Email:</strong> &nbsp; {user.email}
                                    </ListGroupItem>
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>

                    <div className="col-12 col-xl-4">
                        <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                            <CardHeader title='Linklər'>
                                <CardAction icon={faAdd} title='Yarat' classList={`col-6 text-end`} openModal={user.userLinks?.length < 10 ? () => openModal('Link yarat', <ProfileLinkEditForm onClose={closeModal} data={user} type='add' />, 'md') : onUserUpToLimit} />
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    {user.userLinks?.length > 0 ? user.userLinks.map((link) => (
                                        <ListGroupItem classList='list-group-item border-0 d-flex align-items-center justify-content-between px-0 mb-2' key={link.id} >
                                            <div className="col-8 col-lg-9 d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm"> {link.title} </h6>
                                                <p className="mb-0 text-xs">
                                                    <span> {link.type} </span>
                                                    <span> - </span>
                                                    <span> {link.active ?
                                                        <span className='text-success'>Aktif</span>
                                                        :
                                                        <span className='text-danger'> Passiv </span>
                                                    } </span>
                                                </p>
                                            </div>
                                            <div className="col-4 col-lg-3 d-flex align-items-center justify-content-between">
                                                <Button classList='text-end' to={link.url} target="_blank">
                                                    <FontAwesomeIcon icon={faLink} className="move-on-hover" />
                                                </Button>
                                                <CardAction icon={faEdit} title='Düzəlt' classList='text-end' openModal={() => openModal('Linki düzəlt', <ProfileLinkEditForm onClose={closeModal} data={link} type='update' />, 'md')} />
                                                <CardAction icon={faTrash} title='Sil' classList='text-end' openModal={() => openModal('Linki sil', <ProfileLinkEditForm onClose={closeModal} data={link} type='delete' />, 'md')} />
                                            </div>
                                        </ListGroupItem>
                                    )) : <p> Məlumat yoxdur </p>}
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>
                </div>
            </div>
            {hasAlert && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setHasAlert(false)} />}
            {isOpen && <Modal onClose={closeModal} title={modalTitle} size={modalSize}>{modalContent}</Modal>}
        </>
    )
}

function ProfilePictureEditForm({ onClose }) {
    const { profileImgUrl, setProfileImgUrl } = useUserProfile(undefined);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState([]);

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

    async function handleSubmitUpdateUserPhoto(e) {
        e.preventDefault();
        let file = fileInputRef.current.files[0];
        let accessToken = localStorage.getItem('accessToken');
        if (!file) return setSubmitStatus({ type: 'error', message: 'Fayl seçilməlidir!' });
        if (!accessToken) return setSubmitStatus({ type: 'error', message: 'Token yoxdur!' });
        setIsLoading(true);
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("accessToken", accessToken);

        const response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/upload-userPhoto`,
            method: 'POST',
            // headers: { 'Authorization': `Bearer ${accessToken}` },
            body: formData,
        });

        let data = response.data;
        setIsLoading(false);
        if (response.status === 200) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            return setSubmitStatus({ type: data.type, message: data.message });
        } else return setSubmitStatus({ type: data.type, message: data.message });
    }

    return (
        <div className="container-fluid">
            <div className="avatar-container mx-auto">
                <div className="picture-container position-relative" onClick={handleImageClick}>
                    <img src={profileImgUrl} alt="Profil şəkili" title={isLoading ? 'Şəkil yüklənir...' : 'Yeni şəkil yükləmək üçün basın'} className="shadow-sm border" style={{ cursor: isLoading && 'progress' }} />
                    <input type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none', cursor: isLoading && 'progress' }} accept="image/png, image/jpeg, image/jpg" disabled={isLoading && true} />
                </div>
            </div>
            <div className='text-end mt-3'>
                <button type="submit" className='btn bg-gradient-primary mx-2' onClick={handleSubmitUpdateUserPhoto} disabled={isLoading && true}>{isLoading ? 'Göndərilir' : 'Göndər'}</button>
                <button type="button" className='btn bg-dark text-white' onClick={onClose}>Bağla</button>
            </div>
            {submitStatus && (
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
        </div>
    )
}

function ProfileLinkEditForm({ onClose, data, type }) {
    return (
        <div className="card-body px-0 pt-0">
            <div className="container-fluid">
                {(type === 'add') && <Form config={new ConfigGenerator().generateUserLinks('add', data.id)} initialData={data} onClose={onClose} />}
                {(type === 'update') && <Form config={new ConfigGenerator().generateUserLinks('update', data.id)} initialData={data} onClose={onClose} />}
                {(type === 'delete') && <Form config={new ConfigGenerator().deleteUserLinks('delete', data.id)} initialData={data} onClose={onClose} />}
            </div>
        </div>
    )
}

export default Profile;