import { useEffect, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import Line from "../../../components/Line/Line";
import Button from "../../../components/Button/Button";
import useAuth from "../../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faPencilAlt, faEdit, faTrash, faLink, faAdd, faCopy } from '@fortawesome/free-solid-svg-icons';
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
    const [submitStatus, setSubmitStatus] = useState([]);
    const [hasAlert, setHasAlert] = useState(false);
    const { localUser } = useAuth();
    const { id } = useParams();
    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState({});
    const userImgUrl = `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_PHOTO_SERVER_URL}/${user.photo}`;
    const [modalConfig, setModalConfig] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) return setUser(localUser);

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

    function onCopyText() {
        setHasAlert(true);
        setSubmitStatus(infoMessages.LINK_COPIED);
    }

    function onUserUpToLimit() {
        setHasAlert(true);
        setSubmitStatus(errorMessages.USER_UP_TO_LINK_LIMIT);
    }

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
            {isFetching && <Loader />}
            <div className="container-fluid">
                <div className="page-header min-height-300 border-radius-xl mt-4">
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <UserProfileCard classList='blur shadow-blur mx-4 mt-n6 overflow-hidden'>
                    <CardBody>
                        <div className={`row gx-4 ${window.innerWidth <= 425 ? 'align-items-center flex-column' : ''}`}>
                            <div className="col-auto">
                                <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('İstifadəçi şəklini dəyiş', 'md', <Form config={new ConfigGenerator().generateUserPhoto('update', user.id)} initialData={user} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
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
            </div>
            <div className="container-fluid py-4">
                <div className="row" style={{ rowGap: '1rem' }}>
                    <div className="col-12 col-xl-4">
                        <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                            <CardHeader title='Profil məlumatları'>
                                <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('İstifadəçi məlumatları', 'lg', <Form config={new ConfigGenerator().generateUserData('update', user.id)} initialData={user} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                    <FontAwesomeIcon icon={faUserEdit} />
                                </Button>
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
                                <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={user.userLinks?.length < 10 ? () => handleOpenModal('İstifadəçi linki yarat', 'md', <Form config={new ConfigGenerator().generateUserLinks('add', user.id)} initialData={user} onClose={handleCloseModal} />) : onUserUpToLimit} style={{ fontSize: '16px' }}>
                                    <FontAwesomeIcon icon={faAdd} />
                                </Button>
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    {user.userLinks?.length > 0 ? user.userLinks.map((data) => (
                                        <ListGroupItem classList='list-group-item border-0 d-flex align-items-center justify-content-between px-0 mb-2' key={data.id} >
                                            <div className="col-8 col-lg-9 d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm"> {data.title} </h6>
                                                <p className="mb-0 text-xs">
                                                    <span> {data.type} </span>
                                                    <span> - </span>
                                                    <span> {data.active ?
                                                        <span className='text-success'>Aktif</span>
                                                        :
                                                        <span className='text-danger'> Passiv </span>
                                                    } </span>
                                                </p>
                                            </div>
                                            <div className="col-4 col-lg-3 d-flex align-items-center justify-content-between">
                                                <Button classList='text-end' to={data.url} target="_blank">
                                                    <FontAwesomeIcon icon={faLink} className="move-on-hover" />
                                                </Button>
                                                <Button onClick={() => handleOpenModal('Link düzəliş et', 'md', <Form config={new ConfigGenerator().generateUserLinks('update', data.id)} initialData={data} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button onClick={() => handleOpenModal('Link sil', 'md', <Form config={new ConfigGenerator().deleteUserLinks('delete', data.id)} initialData={data} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
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
            {modalConfig?.isOpen && (<Modal title={modalConfig.title} size={modalConfig.size} onClose={handleCloseModal}> {modalConfig.content} </Modal>)}
        </>
    )
}

export default Profile;