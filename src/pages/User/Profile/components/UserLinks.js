import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardHeader from "../../../../components/Card/CardHeader";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import CardBody from "../../../../components/Card/CardBody";
import ListGroupParent from "../../../../components/ListGroup/ListGroupParent";
import Form from "../../../../components/Form/Form";
import errorMessages from "../../../../statusMessages/error";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useState } from "react";
import { apiRequest } from "../../../../utils/apiRequest";
import PropTypes from "prop-types";


function UserLinks({ user, setUser, onClose, openModal, setSubmitStatus }) {
    const [newUpdatedLinks, setNewUpdatedLinks] = useState([]);
    const [initialLinks, setInitialLinks] = useState(user.userLinks || []);

    function onUserUpToLimit() {
        setSubmitStatus(errorMessages.USER_UP_TO_LINK_LIMIT);
    }

    let sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            }
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (event.id !== over.id) {
            const oldIndex = user.userLinks.findIndex((item) => item.id === active.id);
            const newIndex = user.userLinks.findIndex((item) => item.id === over.id);

            const updatedLinks = [...user.userLinks];
            const [movedItem] = updatedLinks.splice(oldIndex, 1);
            updatedLinks.splice(newIndex, 0, movedItem);
            setNewUpdatedLinks(updatedLinks);

            setUser((prevState) => ({
                ...prevState,
                userLinks: updatedLinks,
            }));
        }
    }

    const handleReset = () => {
        setNewUpdatedLinks([]);
        setUser((prevState) => ({
            ...prevState,
            userLinks: initialLinks,
        }));
    }

    const handleSubmit = async () => {
        const updatedOrderLinks = newUpdatedLinks.map((link, index) => ({
            ...link,
            order: index + 1,
        }));

        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/update-userLinks-order`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedOrderLinks)
            });

            let data = response.data;
            setSubmitStatus(data);
            if (response.status === 200) {
                setNewUpdatedLinks([])
                setUser((prevState) => ({
                    ...prevState,
                    userLinks: updatedOrderLinks,
                }));
            }
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        }
    }

    return (
        <div className="col-12 col-xl-4">
            <UserProfileCard classList='max-height-400 overflow-x-hidden'>
                <CardHeader title='Linklər'>
                    {
                        newUpdatedLinks.length > 0 ? (
                            <>
                                <Button asButton={true} onClick={handleReset} classList='border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0'>Sıfırla</Button>
                                <Button asButton={true} onClick={handleSubmit} classList='border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0'>Yadda saxla</Button>
                            </>
                        ) : (
                            <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={user.userLinks?.length < 10 ? () => openModal('İstifadəçi linki yarat', 'md', <Form config={new ConfigGenerator().generateUserLinks('add', user.id)} initialData={user} onClose={onClose} />) : onUserUpToLimit} style={{ fontSize: '16px' }}>
                                <FontAwesomeIcon icon={faAdd} />
                            </Button>
                        )
                    }
                </CardHeader>
                <CardBody classList='p-3'>
                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
                        <SortableContext items={user.userLinks || []} strategy={verticalListSortingStrategy}>
                            <ListGroupParent>
                                {user.userLinks?.length > 0 ? user.userLinks?.map((data) => (
                                    <SortableItem data={data} openModal={openModal} onClose={onClose} key={data.id} />
                                )) : <p> Məlumat yoxdur! </p>}
                            </ListGroupParent>
                        </SortableContext>
                    </DndContext>
                </CardBody>
            </UserProfileCard>
        </div >
    )
}

UserLinks.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    setSubmitStatus: PropTypes.func.isRequired,
};

export default UserLinks;