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



function UserLinks({ user, setUser, onClose, openModal, setSubmitStatus }) {
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

            setUser((prevState) => ({
                ...prevState,
                userLinks: updatedLinks,
            }));
        }
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
        </div>
    )
}

export default UserLinks;