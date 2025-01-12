import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardHeader from "../../../../components/Card/CardHeader";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faAdd, faEdit, faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import CardBody from "../../../../components/Card/CardBody";
import ListGroupParent from "../../../../components/ListGroup/ListGroupParent";
import ListGroupItem from "../../../../components/ListGroup/ListGroupItem";
import Form from "../../../../components/Form/Form";
import errorMessages from "../../../../statusMessages/error";


function UserLinks({ user, onClose, openModal, setSubmitStatus }) {
    function onUserUpToLimit() {
        setSubmitStatus(errorMessages.USER_UP_TO_LINK_LIMIT);
    }

    return (
        <div className="col-12 col-xl-4">
            <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                <CardHeader title='Linklər'>
                    <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={user.userLinks?.length < 10 ? () => openModal('İstifadəçi linki yarat', 'md', <Form config={new ConfigGenerator().generateUserLinks('add', user.id)} initialData={user} onClose={onClose} />) : onUserUpToLimit} style={{ fontSize: '16px' }}>
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
                                    <Button onClick={() => openModal('Link düzəliş et', 'md', <Form config={new ConfigGenerator().generateUserLinks('update', data.id)} initialData={data} onClose={onClose} />)} style={{ fontSize: '16px' }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button onClick={() => openModal('Link sil', 'md', <Form config={new ConfigGenerator().deleteUserLinks('delete', data.id)} initialData={data} onClose={onClose} />)} style={{ fontSize: '16px' }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                            </ListGroupItem>
                        )) : <p> Məlumat yoxdur! </p>}
                    </ListGroupParent>
                </CardBody>
            </UserProfileCard>
        </div>
    )
}

export default UserLinks;