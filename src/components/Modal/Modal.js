import { createPortal } from "react-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ title, size, onClose, children }) {
    return createPortal(
        <div className={`modal modal-${size}`} style={{ display: 'inline-block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header" style={{ alignItems: 'unset !important' }}>
                        <h5 className="modal-title"> {title} </h5>
                        <Button asButton={true} classList='btn-close text-dark' onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} size='2x' />
                        </Button>
                    </div>
                    <div className="modal-body">
                        { children }
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Modal;