import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

function CardAction({ icon, title, classList, openModal }) {
    return (
        <div className={classList}>
            <Button classList='bg-transparent border-0' asButton={true} onClick={openModal}>
                <FontAwesomeIcon icon={icon} className="text-secondary" title={title} />
            </Button>
        </div>
    )
}

export default CardAction;