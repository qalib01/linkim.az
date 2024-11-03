import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

function CardAction({ icon, title }) {
    return (
        <div className="col-md-4 text-end">
            <Button>
                <FontAwesomeIcon icon={icon} className="text-secondary" title={title} />
            </Button>
        </div>
    )
}

export default CardAction;