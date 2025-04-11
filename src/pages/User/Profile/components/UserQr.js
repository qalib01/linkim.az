import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../../../components/Button/Button"
import { faQrcode } from "@fortawesome/free-solid-svg-icons"
import Modal from "../../../../components/Modal/Modal"
import { useState } from "react"
import QRCode from "../../../../components/QR/QR"

const UserQr = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const coverColor = user?.userCover?.find(cover => cover.type === 'color');

    const handleOpenModal = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
    }

    return (
        <>
            <div className="col-auto my-auto" title='Hesabın üçün QR kod yarat'>
                <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faQrcode} style={{ fontSize: '24px' }} color="#344767" />
                </Button>
            </div>
            {
                isOpen && <Modal title='QR kod yarat' size='md' onClose={handleCloseModal}>
                    <QRCode username={user.username} coverColor={coverColor?.data} />
                </Modal>
            }
        </>
    )
}

export default UserQr;