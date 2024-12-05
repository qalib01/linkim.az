import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faLink } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import CardBody from "../../../components/Card/CardBody";
import useAuth from "../../../hooks/useAuth";
import moment from 'moment';
import Form from "../../../components/Form/Form";
import formConfigs from "../../../utils/formConfigs";
import Modal from "../../../components/Modal/Modal";
// import { hasMaxTrimedLength, hasMinLength, isNotEmpty, isValidUsername } from "../../../utils/validation";
// import { useInput } from "../../../hooks/useInput";
// import errorMessages from "../../../statusMessages/error";
// import { apiRequest } from "../../../utils/apiRequest";
// import Alert from "../../../components/Alert/Alert";
// import Input from "../../../components/Form/Input";
// import Modal from "../../../components/Modal/Modal";
library.add(faLink)

function Dashboard() {
    // const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // if (user.username === null || user.username === undefined) {
    //     setIsOpen(true)
    // }

    function closeModal() {
        document.body.style.overflow = 'visible';
    }

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <UserProfileCard>
                            <CardBody classList='p-3'>
                                <div className="row">
                                    <div className="col-9">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Link sayı</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {user.userLinks ? user.userLinks.length : 0}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-3 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faLink} size="lg" style={{ color: '#fff' }} />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </UserProfileCard>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <UserProfileCard>
                            <CardBody classList='p-3'>
                                <div className="row">
                                    <div className="col-9">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Aktif link sayı</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {user.userLinks ? user.userLinks.filter(link => link.is_active).length : 0}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-3 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faLink} size="lg" style={{ color: '#fff' }} />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </UserProfileCard>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <UserProfileCard>
                            <CardBody classList='p-3'>
                                <div className="row">
                                    <div className="col-9">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Qeydiyyat tarixi</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {moment(user.createdAt).format('DD-MM-YYYY')}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-3 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faCalendar} size="lg" style={{ color: '#fff' }} />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </UserProfileCard>
                    </div>
                </div>
            </div>
            <Modal onClose={closeModal} title='istifadəçi adın' size='md'>
                <Form config={formConfigs.updateUserData} user={user} onClose={closeModal} />
            </Modal>
            {/* { isOpen && <Modal onClose={closeModal} content={ProfileEditForm} title='İstifadəçi adı' size='md' /> } */}
        </>
    )
}


// function ProfileEditForm({ onClose }) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState([]);
//     const accessToken = localStorage.getItem('accessToken');
//     const { user } = useAuth();

//     const {
//         value: usernameValue,
//         handleInputChange: handleUsernameChange,
//         handleInputBlur: handleUsernameBlur,
//         hasError: hasUsernameError,
//     } = useInput(user.username || '', (value) => isNotEmpty(value) && isValidUsername(value) && hasMinLength(value, 4) && hasMaxTrimedLength(value, 12), (value) => value.toLowerCase());

//     async function handleSubmitUpdateUserData(e) {
//         e.preventDefault();
//         setIsLoading(true);
//         const updatedData = {};

//         if (usernameValue !== user.username) updatedData.username = usernameValue;

//         if (Object.keys(updatedData).length === 0) {
//             setIsLoading(false);
//             return setSubmitStatus(errorMessages.CHANGES_NOT_FOUND);
//         }

//         if (hasUsernameError) {
//             setIsLoading(false);
//             return setSubmitStatus(errorMessages.ALL_FIELDS_REQUIRED);
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
//             <div className="row my-2">
//                 <div className="col-12 col-lg-6">
//                     <Input
//                         id='username'
//                         type='text'
//                         name='username'
//                         label='İstifadəçi adı'
//                         placeholder='İstifadəçi adın'
//                         info={`${!user.username ? 'İstifadəçi adı balaca hərflə olmalı və xüsusi işarələr olmamalıdır. min: 4, max: 12 xarakter ola bilər. Nümunə: link, link01, link_01' : ''}`}
//                         required={true}
//                         disabled={user.username && true}
//                         readonly={user.username && 'readonly'}
//                         value={usernameValue}
//                         onChange={handleUsernameChange}
//                         onBlur={handleUsernameBlur}
//                         error={hasUsernameError}
//                     />
//                 </div>
//             </div>
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

export default Dashboard;