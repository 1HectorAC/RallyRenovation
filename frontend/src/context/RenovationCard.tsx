import type React from "react";
import type { renovationShortType } from "../services/RenovationService";
import { Link } from "react-router-dom";

type cardComponentProps = renovationShortType & { url: string };

const RenovationCard: React.FC<cardComponentProps> = ({ id, title, description, ownerName, catagoryList, url }) => {
    return (
        <div className="shortRenovationCard">
            <Link to={url}>
                <p>Id: {id.toString()}</p>
                <p>Title: {title}</p>
                <p>Desc: {description}</p>
                <p>By: {ownerName}</p>
                <p>Catagories: {catagoryList}</p>
            </Link>
        </div>
    )
}
export default RenovationCard;