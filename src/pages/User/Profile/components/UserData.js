import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardHeader from "../../../../components/Card/CardHeader";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import Form from "../../../../components/Form/Form";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faCopy, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import CardBody from "../../../../components/Card/CardBody";
import Line from "../../../../components/Line/Line";
import ListGroupParent from "../../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../../components/ListGroup/ListGroupItem";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import infoMessages from "../../../../statusMessages/info";


function UserData({ user, onClose, openModal, setSubmitStatus }) {
    function onCopyText() {
        setSubmitStatus(infoMessages.LINK_COPIED);
    }

    return (
        <div className="col-12 col-xl-4">
            <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                <CardHeader title='Profil məlumatları'>
                    <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => openModal('İstifadəçi məlumatları', 'lg', <Form config={new ConfigGenerator().generateUserData('update', user.id)} initialData={user} onClose={onClose} />)} style={{ fontSize: '16px' }}>
                        <FontAwesomeIcon icon={faUserEdit} />
                    </Button>
                </CardHeader>
                <CardBody classList='p-3'>
                    <p className="text-sm"> {user.bio} </p>
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
    )
}

export default UserData;