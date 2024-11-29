import { useEffect, useRef, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import { faUserEdit, faPencilAlt, faEdit, faTrash, faLink, faAdd } from '@fortawesome/free-solid-svg-icons';
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
import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidUsername, isValidURL, isValidPassword } from "../../../utils/validation";
import Input from "../../../components/Form/Input";
import Textarea from "../../../components/Form/Textarea";
import Select from "../../../components/Form/Select";
import errorMessages from "../../../statusMessages/error";


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
                        <div className={`row gx-4 ${window.innerWidth <= 375 ? 'align-items-center flex-column' : ''}`}>
                            <div className="col-auto">
                                <CardAction title='Profil şəkili' openModal={() => openModal('Profil şəkili', <ProfilePictureEditForm onClose={closeModal} />, 'md')}>
                                    <div className="avatar-container">
                                        <div className={`avatar ${window.innerWidth > 375 ? 'avatar-xl' : 'avatar-xxl'} position-relative`}>
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
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-6 text-end' openModal={() => openModal('Profil məlumatları', <ProfileEditForm onClose={closeModal} />, 'lg')} />
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
                        <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                            <CardHeader title='Linklər'>
                                <CardAction icon={faAdd} title='Yarat' classList='col-6 text-end' openModal={() => openModal('Link yarat', <ProfileLinkEditForm onClose={closeModal} type='add' />, 'lg')} />
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    {user.userLinks.length > 0 && user.userLinks.map((link) => (
                                        <ListGroupItem classList='border-0 d-flex align-items-center justify-content-between px-0 mb-2' key={link.id}>
                                            <div className="col-8 col-lg-9 d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm"> {link.title} </h6>
                                                <p className="mb-0 text-xs">
                                                    <span> {link.type} </span>
                                                    <span> - </span>
                                                    <span> {link.is_active ? 
                                                        <span className='text-success'>Aktif</span>
                                                        : 
                                                        <span className='text-danger'> Passiv </span>
                                                    } </span>
                                                </p>
                                            </div>
                                            <div className="col-4 col-lg-3 d-flex align-items-center justify-content-between">
                                                <Button classList='text-end' to={link.url} target="_blank">
                                                    <FontAwesomeIcon icon={faLink} />
                                                </Button>
                                                <CardAction icon={faEdit} title='Düzəlt' classList='text-end' openModal={() => openModal('Linki düzəlt', <ProfileLinkEditForm onClose={closeModal} data={link} type='update' />, 'lg')} />
                                                <CardAction icon={faTrash} title='Sil' classList='text-end' openModal={() => openModal('Linki sil', <ProfileLinkEditForm onClose={closeModal} data={link} type='delete' />, 'md')} />
                                            </div>
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
    const maxDataLength = 300;

    const {
        value: nameValue,
        handleInputChange: handleNameChange,
        handleInputBlur: handleNameBlur,
        hasError: hasNameError,
    } = useInput(user.name || '', (value) => isNotEmpty(value));

    const {
        value: surnameValue,
        handleInputChange: handleSurnameChange,
        handleInputBlur: handleSurnameBlur,
        hasError: hasSurnameError,
    } = useInput(user.surname || '', (value) => isNotEmpty(value));

    const {
        value: emailValue,
    } = useInput(user.email || '', (value) => isNotEmpty(value), (value) => value.toLowerCase());

    const {
        value: usernameValue,
        handleInputChange: handleUsernameChange,
        handleInputBlur: handleUsernameBlur,
        hasError: hasUsernameError,
    } = useInput(user.username || '', (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12), (value) => value.toLowerCase());

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: hasPasswordError,
    } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value));

    const {
        value: passwordConfirmValue,
        handleInputChange: handlePasswordConfirmChange,
        handleInputBlur: handlePasswordConfirmBlur,
        hasError: hasPasswordConfirmError,
    } = useInput('', (value) => isEqualsToOtherValue(value, passwordValue) && isNotEmpty(value));

    const {
        value: dataValue,
        handleInputChange: handleDataChange,
        handleInputBlur: handleDataBlur,
        hasError: hasDataError,
    } = useInput(user.bio || '', (value) => isNotEmpty(value) && hasMaxTrimedLength(value, maxDataLength));

    async function handleSubmitUpdateUserData(e) {
        e.preventDefault();
        setIsLoading(true);
        const updatedData = {};

        if (nameValue !== user.name) updatedData.name = nameValue;
        if (surnameValue !== user.surname) updatedData.surname = surnameValue;
        if (emailValue !== user.email) updatedData.email = emailValue;
        if (usernameValue !== user.username) updatedData.username = usernameValue;
        if (dataValue.trim() !== user.bio) updatedData.bio = dataValue.trim();
        if (passwordValue) updatedData.password = passwordValue;

        if (Object.keys(updatedData).length === 0) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.CHANGES_NOT_FOUND);
        }

        if (hasNameError || hasSurnameError || hasPasswordError || hasUsernameError || hasPasswordConfirmError || hasDataError) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
        };

        if (hasPasswordError || hasPasswordConfirmError) {
            setIsLoading(false);
            return setSubmitStatus(errorMessages.PASSWORDS_MUST_BE_SAME)
        };

        const response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
            method: 'POST',
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${accessToken}` },
            body: { ...updatedData }
        });


        let data = response.data;
        setIsLoading(false);
        if (response.status === 200) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            setIsLoading(false);
            return setSubmitStatus({ type: data.type, message: data.message });
        }
        setIsLoading(false);
        return setSubmitStatus({ type: data.type, message: data.message });
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
                            readonly='readonly'
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
                            info={`${!user.username ? 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01' : ''}`}
                            required={true}
                            disabled={user.username && true}
                            readonly={user.username && 'readonly'}
                            value={usernameValue}
                            onChange={handleUsernameChange}
                            onBlur={handleUsernameBlur}
                            error={hasUsernameError}
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
                            info='Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr olmamalıdır. min: 8 xarakter ola bilər. Nümunə: Link01!!'
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
                        maxLength={maxDataLength}
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
                {(type === 'add' || type === 'update') && <AddProfileLinkForm onClose={onClose} linkData={data} type={type} />}
                {(type === 'delete') && <DeleteProfileLinkForm onClose={onClose} linkData={data} type={type} />}
            </div>
        </div>
    )
}

function AddProfileLinkForm({ onClose, linkData, type }) {
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const {
        value: typeValue,
        handleInputChange: handleTypeChange,
        handleInputBlur: handleTypeBlur,
        hasError: hasTypeError,
    } = useInput(linkData?.type || '', (value) => isNotEmpty(value));

    const {
        value: titleValue,
        handleInputChange: handleTitleChange,
        handleInputBlur: handleTitleBlur,
        hasError: hasTitleError,
    } = useInput(linkData?.title || '', (value) => isNotEmpty(value));

    const {
        value: urlValue,
        handleInputChange: handleUrlChange,
        handleInputBlur: handleUrlBlur,
        hasError: hasUrlError,
    } = useInput(linkData?.url || '', (value) => isNotEmpty(value) && isValidURL(value));

    const {
        value: isActiveValue,
        handleInputChange: handleIsActiveChange,
        handleInputBlur: handleIsActiveBlur,
        hasError: hasIsActiveError,
    } = useInput(linkData?.is_active ?? true, (value) => value);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const updatedData = {};

        if (type === 'update') {
            if (typeValue !== linkData.type) updatedData.link_type = typeValue;
            if (titleValue !== linkData.title) updatedData.link_title = titleValue;
            if (urlValue !== linkData.url) updatedData.url = urlValue;
            if (isActiveValue !== linkData.is_active) updatedData.is_active = isActiveValue;
    
            if (Object.keys(updatedData).length === 0) {
                setIsLoading(false);
                return setSubmitStatus({ type: 'error', message: 'Yenilənəcək məlumat tapılmadı!' });
            }
        } else {
            if (typeValue) updatedData.link_type = typeValue;
            if (titleValue) updatedData.link_title = titleValue;
            if (urlValue) updatedData.url = urlValue;
            if (isActiveValue) updatedData.is_active = isActiveValue;

            if (!updatedData.link_title && !updatedData.url) {
                setIsLoading(false);
                return setSubmitStatus({ type: 'error', message: 'Bütün xanalar tam doldurulmalıdır!' });
            }
        }

        if (hasTypeError || hasTitleError || hasUrlError || hasIsActiveError) {
            setIsLoading(false);
            return setSubmitStatus({ type: 'error', message: 'Bütün xanalar düzgün doldurulmalıdır!' });
        };

        const response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/api/user/${type}-userLinks`,
            method: 'POST',
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${accessToken}` },
            body: { ...(linkData?.id && { id: linkData.id }), ...updatedData }
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
        <>
            <div className="row">
                <div className="col-12 col-lg-6 mb-2">
                    <Input
                        id='url'
                        type='text'
                        name='url'
                        label='Linkin urli'
                        placeholder='https://www.linkim.az'
                        info='Link urli mütləqdir ki, http və ya https ilə başlasın. Nümunə: https://linkim.az, http://numune.az'
                        required={true}
                        value={urlValue}
                        onChange={handleUrlChange}
                        onBlur={handleUrlBlur}
                        error={hasUrlError}
                    />
                </div>
                <div className="col-12 col-lg-6 mb-2">
                    <Input
                        id='title'
                        type='text'
                        name='title'
                        label='Linkin adı'
                        placeholder='Linkin adı'
                        required={true}
                        value={titleValue}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        error={hasTitleError}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 mb-2">
                    <Select id='type'
                        name='type'
                        label='Linkin tipi'
                        required={true}
                        value={typeValue}
                        onChange={handleTypeChange}
                        onBlur={handleTypeBlur}
                        error={hasTypeError}
                    >
                        <option value='sosial'> Sosial </option>
                        <option value='şəxsi'> Şəxsi </option>
                        <option value='digər'> Digər </option>
                    </Select>
                </div>
                <div className="col-12 col-lg-6 mb-2">
                    <Select id="isActive"
                        name="isActive"
                        label="Linkin statusu"
                        required={true}
                        value={isActiveValue}
                        onChange={handleIsActiveChange}
                        onBlur={handleIsActiveBlur}
                        error={hasIsActiveError}
                    >
                        <option value={true}> Görünür </option>
                        <option value={false}> Görünmür </option>
                    </Select>
                </div>
            </div>
            <div className='text-end mt-3'>
                <button type="submit" className='btn bg-gradient-primary mx-2' onClick={handleSubmit} disabled={isLoading && true}>{isLoading ? 'Göndərilir' : 'Göndər'}</button>
                <button type="button" className='btn bg-dark text-white' onClick={onClose}>Bağla</button>
            </div>
            {submitStatus && (
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
        </>
    )
}

function DeleteProfileLinkForm({ onClose, linkData, type }) {
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const response = await apiRequest({
            url: `${process.env.REACT_APP_API_LINK}/api/user/${type}-userLinks`,
            method: 'POST',
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${accessToken}` },
            body: { id: linkData.id }
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
        <>
            <h6>
                Sil düyməsini təsdiqi etdiyiniz zaman <strong>"{linkData.title}"</strong> linkini bir dəfəlik silmiş olacaqsınız!
            </h6>
            <div className='text-end mt-3'>
                <button type="submit" className='btn bg-gradient-primary mx-2' onClick={handleSubmit} disabled={isLoading && true}>{isLoading ? 'Silinir' : 'Sil'}</button>
                <button type="button" className='btn bg-dark text-white' onClick={onClose}>Bağla</button>
            </div>
            {submitStatus && (
                <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
            )}
        </>
    )
}

export default Profile;