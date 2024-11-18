import { useEffect, useRef, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import { faUserEdit, faPencilAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { apiRequest } from "../../../utils/apiRequest";
import Alert from "../../../components/Alert/Alert";
import { useInput } from "../../../hooks/useInput";
import { hasMinLength, isEqualsToOtherValue, isNotEmpty } from "../../../utils/validation";
import Input from "../../../components/Form/Input";
import Textarea from "../../../components/Form/Textarea";


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
                                <CardAction title='Profil şəkili' openModal={() => openModal('Profil şəkili', <ProfilePictureEditForm onClose={closeModal} />, 'md')}>
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
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-md-4 text-end' openModal={() => openModal('Profil məlumatları', <ProfileEditForm onClose={closeModal} />, 'lg')} />
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
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-md-4 text-end' openModal={() => openModal('Linklər', <ProfileLinkEditForm onClose={closeModal} />, 'lg')} />
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    {user.userLinks.length > 0 && user.userLinks.map((link) => (
                                        <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' key={link.id}>
                                            {/* <div className="avatar me-3">
                                                <img src="../assets/img/kal-visuals-square.jpg" alt="kal" className="border-radius-lg shadow" />
                                            </div> */}
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

function EditDialogBox({ onClose, title, content, size }) {
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
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

function ProfileEditForm({ onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const { user } = useAuth();

    const {
        value: nameValue,
        setValue: setNameValue,
        handleInputChange: handleNameChange,
        handleInputBlur: handleNameBlur,
        hasError: hasNameError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: surnameValue,
        setValue: setSurnameValue,
        handleInputChange: handleSurnameChange,
        handleInputBlur: handleSurnameBlur,
        hasError: hasSurnameError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: emailValue,
        setValue: setEmailValue,
    } = useInput('', () => { });

    const {
        value: usernameValue,
        setValue: setUsernameValue,
    } = useInput('', () => { });

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: hasPasswordError,
    } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value));

    const {
        value: passwordConfirmValue,
        handleInputChange: handlePasswordConfirmChange,
        handleInputBlur: handlePasswordConfirmBlur,
        hasError: hasPasswordConfirmError,
    } = useInput('', (value) => isEqualsToOtherValue(value, passwordValue) && isNotEmpty(value));

    const {
        value: dataValue,
        setValue: setDataValue,
        handleInputChange: handleDataChange,
        handleInputBlur: handleDataBlur,
        hasError: hasDataError,
    } = useInput('', (value) => isNotEmpty(value));

    useEffect(() => {
        setNameValue(user.name || '');
        setSurnameValue(user.surname || '');
        setEmailValue(user.email || '');
        setUsernameValue(user.username || '');
        setDataValue(user.bio || '');
    }, [user, setNameValue, setSurnameValue, setEmailValue, setUsernameValue, setDataValue]);

    async function handleSubmitUpdateUserData(e) {
        e.preventDefault();
        setIsLoading(true);
        const updatedData = {};

        if (nameValue !== user.name) updatedData.name = nameValue;
        if (surnameValue !== user.surname) updatedData.surname = surnameValue;
        if (emailValue !== user.email) updatedData.email = emailValue;
        if (dataValue.trim() !== user.bio) updatedData.bio = dataValue.trim();
        if (passwordValue) updatedData.password = passwordValue;
        if (hasPasswordError || hasPasswordConfirmError) return setSubmitStatus({ type: 'error', message: 'Şifrələr eyni olmalıdır!' });

        if (Object.keys(updatedData).length === 0) {
            setIsLoading(false);
            return setSubmitStatus({ type: 'error', message: 'Yenilənəcək məlumat tapılmadı!' });
        }

        const response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
            method: 'POST',
            headers: { "Content-Type": "application/json", /* 'Authorization': `Bearer ${accessToken}` */ },
            body: { nameValue, surnameValue, emailValue, passwordValue, dataValue, accessToken }
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
            <form onSubmit={handleSubmitUpdateUserData}>
                <div className="row">
                    <div className="col-12 col-lg-6 mb-2">
                        <Input
                            id='name'
                            type='text'
                            name='name'
                            label='Ad'
                            placeholder='Adın'
                            required={true}
                            value={nameValue}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            error={hasNameError}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <Input
                            id='surname'
                            type='text'
                            name='surname'
                            label='Soyad'
                            placeholder='Soyadın'
                            required={true}
                            value={surnameValue}
                            onChange={handleSurnameChange}
                            onBlur={handleSurnameBlur}
                            error={hasSurnameError}
                        />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12 col-lg-6 mb-2">
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            label='Email'
                            placeholder='Emailin'
                            required={true}
                            disabled={true}
                            value={emailValue}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <Input
                            id='username'
                            type='text'
                            name='username'
                            label='İstifadəçi adı'
                            placeholder='İstifadəçi adın'
                            required={true}
                            disabled={true}
                            value={usernameValue}
                        />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12 col-lg-6 mb-2">
                        <Input
                            id='password'
                            type='password'
                            name='password'
                            label='Şifrə'
                            placeholder='Şifrən'
                            required={true}
                            value={passwordValue}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            error={hasPasswordError}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <Input
                            id='confirmPassword'
                            type='password'
                            name='password'
                            label='Şifrə təkrar'
                            placeholder='Şifrənin təkrar'
                            required={true}
                            value={passwordConfirmValue}
                            onChange={handlePasswordConfirmChange}
                            onBlur={handlePasswordConfirmBlur}
                            error={hasPasswordConfirmError}
                        />
                    </div>
                </div>
                <div className="row my-3">
                    <Textarea
                        id='bio'
                        name='bio'
                        label='Şəxsi məlumat'
                        placeholder='Şəxsi məlumat'
                        rows={3}
                        value={dataValue}
                        onChange={handleDataChange}
                        onBlur={handleDataBlur}
                        error={hasDataError}
                    />
                </div>
            </form>
            <div className='text-end mt-3'>
                <button type="submit" className='btn bg-gradient-primary mx-2' onClick={handleSubmitUpdateUserData} disabled={isLoading && true}>{isLoading ? 'Göndərilir' : 'Göndər'}</button>
                <button type="button" className='btn bg-dark text-white' onClick={onClose}>Bağla</button>
            </div>
            {submitStatus && (
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
        </div>
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
            url: `${process.env.REACT_APP_API_LINK}/api/user/upload-userPhoto`,
            method: 'POST',
            // headers: {
            //     'Authorization': `Bearer ${accessToken}`
            // },
            body: formData
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
                <div className=" position-relative" onClick={handleImageClick}>
                    <img src={profileImgUrl} alt="Profil şəkili" title={isLoading ? 'Şəkil yüklənir...' : 'Yeni şəkil yükləmək üçün basın'} className="w-100 shadow-sm border" style={{ cursor: isLoading && 'progress' }} />
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

function ProfileLinkEditForm() {
    const { user } = useAuth();

    return (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0">
                            <table className="table align-items-center justify-content-center mb-0 overflow-auto">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Adı</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">Təyinat</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">Statusu</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">Hərəkətlər</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user.userLinks.length > 0 && user.userLinks.map((link) => (
                                            <tr>
                                                <td>
                                                    <h6 className="mb-0 text-sm">{link.title}</h6>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    { link.type }
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class={`badge badge-sm ${link.is_active ? 'bg-gradient-success' : 'bg-gradient-danger'}`}>{ link.is_active ? 'Aktif' : 'Passiv' }</span>
                                                </td>
                                                <td class="align-middle d-flex justify-content-center">
                                                    <CardAction icon={faEdit} title='Düzəlt' classList='col-md-3 text-end' />
                                                    <CardAction icon={faTrash} title='Sil' classList='col-md-3 text-end' />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;