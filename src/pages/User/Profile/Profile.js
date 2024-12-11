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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faPencilAlt, faEdit, faTrash, faLink, faAdd, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useUserProfile } from "../../../hooks/useUserProfile";
import { apiRequest } from "../../../utils/apiRequest";
import Alert from "../../../components/Alert/Alert";
import { useInput } from "../../../hooks/useInput";
import { hasMaxTrimedLength, hasMinLength, isEqualsToOtherValue, isNotEmpty, isValidUsername, isValidPassword } from "../../../utils/validation";
import Input from "../../../components/Form/Input";
import Textarea from "../../../components/Form/Textarea";
import errorMessages from "../../../statusMessages/error";
import CopyToClipboard from "react-copy-to-clipboard";
import infoMessages from "../../../statusMessages/info";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";
import Modal from "../../../components/Modal/Modal";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { DragDropContext, Droppable, Drag } from "react-beautiful-dnd";


function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState(null);
    const [submitStatus, setSubmitStatus] = useState([]);
    const { setProfileImgUrl } = useUserProfile();
    const [ hasAlert, setHasAlert ] = useState(false);
    const { user } = useAuth();
    // const [links, setLinks] = useState([ user.userLinks ])
    const userImgUrl = `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_PHOTO_SERVER_URL}/${user.photo}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    // function onDragEnd() {

    // }

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
                                {/* <CardAction icon={faUserEdit} title='Edit profile' classList='col-6 text-end' openModal={() => openModal('Profil məlumatları', <ProfileEditForm onClose={closeModal} />, 'lg')} /> */}
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
                                <CardAction icon={faAdd} title='Yarat' classList={`col-6 text-end`} openModal={ user.userLinks.length < 10 ? () => openModal('Link yarat', <ProfileLinkEditForm onClose={closeModal} data='' type='add' />, 'md') : onUserUpToLimit } />
                            </CardHeader>

                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    {user.userLinks.length > 0 ? user.userLinks.map((link) => (
                                        <ListGroupItem classList='list-group-item border-0 d-flex align-items-center justify-content-between px-0 mb-2' key={link.id} >
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
                                                    <FontAwesomeIcon icon={faLink} className="move-on-hover" />
                                                </Button>
                                                <CardAction icon={faEdit} title='Düzəlt' classList='text-end' openModal={() => openModal('Linki düzəlt', <ProfileLinkEditForm onClose={closeModal} data={link} type='update' />, 'md')} />
                                                <CardAction icon={faTrash} title='Sil' classList='text-end' openModal={() => openModal('Linki sil', <ProfileLinkEditForm onClose={closeModal} data={link} type='delete' />, 'md')} />
                                            </div>
                                        </ListGroupItem>
                                    )) : <p> Məlumat tapılmadı! </p>}
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>

                    {/* <div className="col-12 col-xl-4">
                        <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                            <CardHeader title='Linklər'>
                                <CardAction icon={faAdd} title='Yarat' classList='col-6 text-end' openModal={() => openModal('Link yarat', <ProfileLinkEditForm onClose={closeModal} type='add' />, 'lg')} />
                            </CardHeader>
                            <DragDropContext
                                onDragStart
                                onDragUpdate
                                onDragEnd={onDragEnd}
                            >
                                <CardBody classList='p-3'>
                                    <Droppable droppableId="links">
                                        {(provided) => (
                                            <ul
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className='list-group'
                                            >
                                                {user.userLinks.length > 0 && user.userLinks.map((link, index) => (
                                                    <Draggable draggableId={link.id} index={index} key={index}>
                                                        {(provided) => (
                                                            <li
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className='list-group-item border-0 d-flex align-items-center justify-content-between px-0 mb-2'
                                                                key={link.id}
                                                            >
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
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </CardBody>
                            </DragDropContext>
                        </UserProfileCard>
                    </div> */}
                </div>
            </div>
            {hasAlert && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setHasAlert(false)} />}
            {isOpen && <Modal onClose={closeModal} title={modalTitle} size={modalSize}>{modalContent}</Modal>}
        </>
    )
}

// function ProfileEditForm({ onClose }) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState([]);
//     const accessToken = localStorage.getItem('accessToken');
//     const { user } = useAuth();
//     const maxDataLength = 300;

//     const {
//         value: nameValue,
//         handleInputChange: handleNameChange,
//         handleInputBlur: handleNameBlur,
//         hasError: hasNameError,
//     } = useInput(user.name || '', (value) => isNotEmpty(value));

//     const {
//         value: surnameValue,
//         handleInputChange: handleSurnameChange,
//         handleInputBlur: handleSurnameBlur,
//         hasError: hasSurnameError,
//     } = useInput(user.surname || '', (value) => isNotEmpty(value));

//     const {
//         value: emailValue,
//     } = useInput(user.email || '', (value) => isNotEmpty(value), (value) => value.toLowerCase());

//     const {
//         value: usernameValue,
//         handleInputChange: handleUsernameChange,
//         handleInputBlur: handleUsernameBlur,
//         hasError: hasUsernameError,
//     } = useInput(user.username || '', (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12), (value) => value.toLowerCase());

//     const {
//         value: passwordValue,
//         handleInputChange: handlePasswordChange,
//         handleInputBlur: handlePasswordBlur,
//         hasError: hasPasswordError,
//     } = useInput('', (value) => hasMinLength(value, 8) && isNotEmpty(value) && isValidPassword(value));

//     const {
//         value: passwordConfirmValue,
//         handleInputChange: handlePasswordConfirmChange,
//         handleInputBlur: handlePasswordConfirmBlur,
//         hasError: hasPasswordConfirmError,
//     } = useInput('', (value) => isEqualsToOtherValue(value, passwordValue) && isNotEmpty(value));

//     const {
//         value: dataValue,
//         handleInputChange: handleDataChange,
//         handleInputBlur: handleDataBlur,
//         hasError: hasDataError,
//     } = useInput(user.bio || '', (value) => isNotEmpty(value) && hasMaxTrimedLength(value, maxDataLength));

//     async function handleSubmitUpdateUserData(e) {
//         e.preventDefault();
//         setIsLoading(true);
//         const updatedData = {};

//         if (nameValue !== user.name) updatedData.name = nameValue;
//         if (surnameValue !== user.surname) updatedData.surname = surnameValue;
//         if (emailValue !== user.email) updatedData.email = emailValue;
//         if (usernameValue !== user.username) updatedData.username = usernameValue;
//         if (dataValue.trim() !== user.bio) updatedData.bio = dataValue.trim();
//         if (passwordValue) updatedData.password = passwordValue;

//         if (Object.keys(updatedData).length === 0) {
//             setIsLoading(false);
//             return setSubmitStatus(errorMessages.CHANGES_NOT_FOUND);
//         }

//         if (hasNameError || hasSurnameError || hasPasswordError || hasUsernameError || hasPasswordConfirmError || hasDataError) {
//             setIsLoading(false);
//             return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
//         };

//         if (hasPasswordError || hasPasswordConfirmError) {
//             setIsLoading(false);
//             return setSubmitStatus(errorMessages.PASSWORDS_MUST_BE_SAME)
//         };

//         const response = await apiRequest({
//             url: `${process.env.REACT_APP_API_LINK}/api/user/update-userData`,
//             method: 'POST',
//             headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${accessToken}` },
//             body: { ...updatedData }
//         });


//         let data = response.data;
//         setIsLoading(false);
//         if (response.status === 200) {
//             setTimeout(() => {
//                 window.location.reload();
//             }, 2000);
//             setIsLoading(false);
//             return setSubmitStatus({ type: data.type, message: data.message });
//         }
//         setIsLoading(false);
//         return setSubmitStatus({ type: data.type, message: data.message });
//     }

//     return (
//         <div className="container-fluid">
//             <form onSubmit={handleSubmitUpdateUserData}>
//                 <div className="row">
//                     <div className="col-12 col-lg-6 mb-2">
//                         <Input
//                             id='name'
//                             type='text'
//                             name='name'
//                             label='Ad'
//                             placeholder='Adın'
//                             required={true}
//                             value={nameValue}
//                             onChange={handleNameChange}
//                             onBlur={handleNameBlur}
//                             error={hasNameError}
//                         />
//                     </div>
//                     <div className="col-12 col-lg-6">
//                         <Input
//                             id='surname'
//                             type='text'
//                             name='surname'
//                             label='Soyad'
//                             placeholder='Soyadın'
//                             required={true}
//                             value={surnameValue}
//                             onChange={handleSurnameChange}
//                             onBlur={handleSurnameBlur}
//                             error={hasSurnameError}
//                         />
//                     </div>
//                 </div>
//                 <div className="row my-2">
//                     <div className="col-12 col-lg-6 mb-2">
//                         <Input
//                             id='email'
//                             type='email'
//                             name='email'
//                             label='Email'
//                             placeholder='Emailin'
//                             required={true}
//                             disabled={true}
//                             readOnly='readonly'
//                             value={emailValue}
//                         />
//                     </div>
//                     <div className="col-12 col-lg-6">
//                         <Input
//                             id='username'
//                             type='text'
//                             name='username'
//                             label='İstifadəçi adı'
//                             placeholder='İstifadəçi adın'
//                             info={`${!user.username ? 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01' : ''}`}
//                             required={true}
//                             disabled={user.username && true}
//                             readOnly={user.username && 'readonly'}
//                             value={usernameValue}
//                             onChange={handleUsernameChange}
//                             onBlur={handleUsernameBlur}
//                             error={hasUsernameError}
//                         />
//                     </div>
//                 </div>
//                 <div className="row my-2">
//                     <div className="col-12 col-lg-6 mb-2">
//                         <Input
//                             id='password'
//                             type='password'
//                             name='password'
//                             label='Şifrə'
//                             placeholder='Şifrən'
//                             info='Şifrə təhlükəsizliklə bağlı böyük, kiçik hərflər, rəqəm və xüsusi işarələr olmamalıdır. min: 8 xarakter ola bilər. Nümunə: Link01!!'
//                             required={true}
//                             value={passwordValue}
//                             onChange={handlePasswordChange}
//                             onBlur={handlePasswordBlur}
//                             error={hasPasswordError}
//                         />
//                     </div>
//                     <div className="col-12 col-lg-6">
//                         <Input
//                             id='confirmPassword'
//                             type='password'
//                             name='password'
//                             label='Şifrə təkrar'
//                             placeholder='Şifrənin təkrar'
//                             required={true}
//                             value={passwordConfirmValue}
//                             onChange={handlePasswordConfirmChange}
//                             onBlur={handlePasswordConfirmBlur}
//                             error={hasPasswordConfirmError}
//                         />
//                     </div>
//                 </div>
//                 <div className="row my-3">
//                     <Textarea
//                         id='bio'
//                         name='bio'
//                         label='Şəxsi məlumat'
//                         placeholder='Şəxsi məlumat'
//                         rows={3}
//                         value={dataValue}
//                         maxLength={maxDataLength}
//                         onChange={handleDataChange}
//                         onBlur={handleDataBlur}
//                         error={hasDataError}
//                     />
//                 </div>
//             </form>
//             <div className='text-end mt-3'>
//                 <button type="submit" className='btn bg-gradient-primary mx-2' onClick={handleSubmitUpdateUserData} disabled={isLoading && true}>{isLoading ? 'Göndərilir' : 'Göndər'}</button>
//                 <button type="button" className='btn bg-dark text-white' onClick={onClose}>Bağla</button>
//             </div>
//             {submitStatus && (
//                 <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus(null)} />
//             )}
//         </div>
//     )
// }

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
    let {user} = useAuth();
    return (
        <div className="card-body px-0 pt-0">
            <div className="container-fluid">
                {(type === 'add') && <Form config={new ConfigGenerator().generateUserLinks('add', user.id)} initialData={data} onClose={onClose} />}
                {(type === 'update') && <Form config={new ConfigGenerator().generateUserLinks('update', data.id)} initialData={data} onClose={onClose} />}
                {(type === 'delete') && <DeleteProfileLinkForm onClose={onClose} linkData={data} type={type} />}
            </div>
        </div>
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
            body: JSON.stringify({id: linkData.id}),
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