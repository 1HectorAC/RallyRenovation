import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RenovationService, type renovationType } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";

//TODO: check if user owns renovation if private

function Renovation() {
    const { id } = useParams();
    const [renovation, setRenovation] = useState<renovationType | null>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    async function onClickDelete() {
        try {
            if (!user) {
                throw Error();
            }
            await RenovationService.delete(user?.token, Number(id));

            // TODO: redirecting to modal and then redirect elsewhere
            navigate("/RenovationDashboard");

        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }
    }

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

            {isAuthenticated &&
                <div>
                    <Link to={`/RenovationEdit/${id}`}><button>Edit</button></Link>
                    <button onClick={onClickDelete}>Delete</button>
                </div>
            }

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