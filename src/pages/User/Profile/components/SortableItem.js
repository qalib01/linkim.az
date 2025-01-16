import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import ListGroupItem from '../../../../components/ListGroup/ListGroupItem';
import Button from '../../../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from '../../../../components/Form/Form';
import { ConfigGenerator } from '../../../../utils/formConfigs';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ data, openModal, onClose }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
    };

    return (
        <ListGroupItem classList='list-group-item border-0 d-flex align-items-center justify-content-between px-0 mb-2' style={style} key={data.id} ref={setNodeRef} {...attributes} {...listeners} >
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
                    <FontAwesomeIcon icon={faLink} />
                </Button>
                <Button asButton={true} onClick={() => openModal('Link düzəliş et', 'md', <Form config={new ConfigGenerator().generateUserLinks('update', data?.id)} initialData={data} onClose={onClose} />)} style={{ fontSize: '16px', backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button asButton={true} onClick={() => openModal('Link sil', 'md', <Form config={new ConfigGenerator().deleteUserLinks('delete', data?.id)} initialData={data} onClose={onClose} />)} style={{ fontSize: '16px', backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
        </ListGroupItem>
    );
}

export default SortableItem;
