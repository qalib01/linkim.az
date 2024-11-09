import { useEffect, useState } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import CardHeader from "../../../components/Card/CardHeader";
import CardAction from "../../../components/Card/CardAction";
import CardBody from "../../../components/Card/CardBody";
import Line from "../../../components/Line/Line";
import Button from "../../../components/Button/Button";
import CloseIconSvg from "../../../components/Icons/CloseIconSvg";
import { createPortal } from "react-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
library.add(faUserEdit);


function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="page-header min-height-300 border-radius-xl mt-4"  /*style="background-image: url('../assets/img/curved-images/curved0.jpg'); background-position-y: 50%;" */>
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <UserProfileCard classList='blur shadow-blur mx-4 mt-n6 overflow-hidden'>
                    <CardBody>
                        <div className="row gx-4">
                            <div className="col-auto">
                                <div className="avatar avatar-xl position-relative">
                                    <img src="../assets/img/bruce-mars.jpg" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                </div>
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
                                <CardAction icon={faUserEdit} title='Edit profile' classList='col-md-4 text-end' openModal={openModal} />
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
                            <CardHeader title='Linklər' />
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
            {isOpen && <EditDialogBox onClose={closeModal} />}
        </>
    )
}

function EditDialogBox({ onClose }) {
    return createPortal(
        <div className="modal modal-lg" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header" style={{ alignItems: 'unset !important' }}>
                        <h5 className="modal-title" id="exampleModalLabel">Profil məlumatları</h5>
                        <Button asButton={true} classList='btn-close text-dark' onClick={onClose}>
                            <CloseIconSvg />
                        </Button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Profile;