import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

function CardAction({ icon, title, classList, openModal, children }) {
    return (
        <div className={classList}>
            <Button classList='bg-transparent border-0' asButton={true} onClick={openModal}>
                <FontAwesomeIcon icon={icon} className="text-secondary move-on-hover" title={title} />
                { children }
            </Button>
        </div>
    )
}

export default CardAction;