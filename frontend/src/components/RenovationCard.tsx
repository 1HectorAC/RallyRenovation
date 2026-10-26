import type React from "react";
import type { renovationShortType } from "../services/RenovationService";
import { Link } from "react-router-dom";

const RenovationCard: React.FC<renovationShortType> = ({ id, title, description, ownerName, catagoryList}) => {
    return (
        <div className="shortRenovationCard">
            <Link to={`/Renovation/${id}`} className="panelLink">
                <h4>{title}</h4>
                <p className="subHeader">By: {ownerName}</p>
                <p>Catagories: {catagoryList}</p>
                <p>Description: {description}</p>
            </Link>
        </div>
    )
}
export default RenovationCard;