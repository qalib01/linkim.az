import { useEffect } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import ListGroupParent from "../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../components/ListGroup/ListGroupItem";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import CardHeader from "../../../components/Card/CardHeader";
import CardAction from "../../../components/Card/CardAction";
import CardBody from "../../../components/Card/CardBody";
import Line from "../../../components/Line/Line";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faUserEdit);


function Profile() {
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
                                        Alec Thompson
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
                            <CardHeader title='Platform Settings' />
                            <CardBody classList='p-3'>
                                <ListGroupParent title='Account'>
                                    <ListGroupItem classList='border-0 px-0' >
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="" title='Email me when someone follows me'>Email me when someone follows me</label>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 px-0' >
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="" title='Email me when someone answers on my post'>Email me when someone answers on my post</label>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 px-0' >
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="" title='Email me when someone mentions me'>Email me when someone mentions me</label>
                                        </div>
                                    </ListGroupItem>
                                </ListGroupParent>
                                <ListGroupParent title='Application'>
                                    <ListGroupItem classList='border-0 px-0' >
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="" title='Subscribe to newsletter'>Subscribe to newsletter</label>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 px-0' >
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="" title='Monthly product updates'>Monthly product updates</label>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 px-0' >
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="" title='Subscribe to newsletter'>Subscribe to newsletter</label>
                                        </div>
                                    </ListGroupItem>
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>

                    <div className="col-12 col-xl-4">
                        <UserProfileCard>
                            <CardHeader title='Profile Information' >
                                <CardAction icon={faUserEdit} title='Edit profile' />
                            </CardHeader>
                            <CardBody classList='p-3'>
                                <p className="text-sm">
                                    Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                                </p>
                                <Line />
                                <ListGroupParent>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">Full Name:</strong> &nbsp; Alec M. Thompson
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">Email:</strong> &nbsp; alecthompson@mail.com
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark">Location:</strong> &nbsp; USA
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 ps-0 pt-0 text-sm' >
                                        <strong className="text-dark text-sm">Social:</strong> &nbsp;
                                        <Button classList='btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0' to='/'>
                                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                                        </Button>
                                        <Button classList='btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0' to='/'>
                                            <FontAwesomeIcon icon={faXTwitter} size="lg" />
                                        </Button>
                                        <Button classList='btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0' to='/'>
                                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                                        </Button>
                                    </ListGroupItem>
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>

                    <div className="col-12 col-xl-4">
                        <UserProfileCard>
                            <CardHeader title='Conversations' />
                            <CardBody classList='p-3'>
                                <ListGroupParent>
                                    <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' >
                                        <div className="avatar me-3">
                                            <img src="../assets/img/kal-visuals-square.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Sophie B.</h6>
                                            <p className="mb-0 text-xs">Hi! I need more information..</p>
                                        </div>
                                        <Button classList='btn btn-link pe-3 ps-0 mb-0 ms-auto' to='/'> Reply </Button>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' >
                                        <div className="avatar me-3">
                                            <img src="../assets/img/marie.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Anne Marie</h6>
                                            <p className="mb-0 text-xs">Awesome work, can you..</p>
                                        </div>
                                        <Button classList='btn btn-link pe-3 ps-0 mb-0 ms-auto' to='/'> Reply </Button>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' >
                                        <div className="avatar me-3">
                                            <img src="../assets/img/ivana-square.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Ivanna</h6>
                                            <p className="mb-0 text-xs">About files I can..</p>
                                        </div>
                                        <Button classList='btn btn-link pe-3 ps-0 mb-0 ms-auto' to='/'> Reply </Button>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' >
                                        <div className="avatar me-3">
                                            <img src="../assets/img/team-3.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Nick Daniel</h6>
                                            <p className="mb-0 text-xs">Hi! I need more information..</p>
                                        </div>
                                        <Button classList='btn btn-link pe-3 ps-0 mb-0 ms-auto' to='/'> Reply </Button>
                                    </ListGroupItem>
                                    <ListGroupItem classList='border-0 d-flex align-items-center px-0 mb-2' >
                                        <div className="avatar me-3">
                                            <img src="../assets/img/team-4.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Peterson</h6>
                                            <p className="mb-0 text-xs">Have a great afternoon..</p>
                                        </div>
                                        <Button classList='btn btn-link pe-3 ps-0 mb-0 ms-auto' to='/'> Reply </Button>
                                    </ListGroupItem>
                                </ListGroupParent>
                            </CardBody>
                        </UserProfileCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;