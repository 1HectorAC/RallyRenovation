import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RenovationService, type renovationType } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";

function Renovation() {
    const { id } = useParams();
    const [renovation, setRenovation] = useState<renovationType | null>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRenovation = async () => {
            try {
                const token = user?.token ?? null;
                const data: renovationType = await RenovationService.get(token, Number(id));
                setRenovation(data);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            } finally {
                setIsLoading(false);
            }

        }
        fetchRenovation();
    }, [])
    return (
        <div>
            <h1>Renovation</h1>
            <Link to="/RenovationEdit"><button>Edit</button></Link>
            <button>Delete</button>

            <p>id: {id} </p>
            {error && <p className="error">{error}</p>}
            {isLoading && <p>Loading...</p>}


            {renovation && (
                <div>
                    <p>Title: {renovation.title}</p>
                    <p>By: {renovation.userId}</p>
                    <p>Description: {renovation.description}</p>
                    <p>Posted: {renovation.timeStamp}</p>
                    <p>catagories: {renovation.catagoryList}</p>
                    <p>Cost: {renovation.cost?.toString() ?? ""}</p>
                    <p>Total Days:{renovation.totalDays?.toString() ?? ""}</p>
                    <p>Company: {renovation.company}</p>
                    <p>Location: {renovation.location}</p>
                    <p>Before Images:{renovation.beforeImageList}</p>
                    <p>After Images:{renovation.afterImageList}</p>
                </div>
            )}

        </div>
    )
}

export default Renovation;