import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faLink } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";
import UserProfileCard from "../../../components/Card/UserProfileCard";
import CardBody from "../../../components/Card/CardBody";
import useAuth from "../../../hooks/useAuth";
import moment from 'moment';
library.add(faLink)

function Dashboard() {
    const { user } = useAuth();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                                                { user.userLinks ? user.userLinks.length : 0 }
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
                                                { user.userLinks ? user.userLinks.filter(link => link.is_active).length : 0 }
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
        </>
    )
}

export default Dashboard;