import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";

function RenovationDashboard() {
    const [renovations, setRenovations] = useState<renovationShortType[]>([]);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { user } = useAuth();
    useEffect(() => {
        const fetchRenovations = async () => {
            try {
                if (user == null) {
                    throw Error("Error with Authentication check");

                }
                const data: renovationShortType[] = await RenovationService.getAllByUser(user?.token);
                setRenovations(data);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchRenovations();
    }, [])
    return (
        <div>
            <h1>Renovations Dasboard</h1>
            <Link to="/RenovationCreate"><button>Add</button></Link>
            <div>
                <h5>Some Stats</h5>
            </div>
            <div>
                <h5>My Renovation</h5>
                {error && <p className="error">{error}</p>}
                {isLoading && <p>Loading...</p>}
                {renovations.map((i, x) => (
                    <div key={x}>
                        <Link to={`/Renovation/${i.id}`}>
                            <div>
                                <p>Id: {i.id.toString()}</p>
                                <p>Title: {i.title}</p>
                                <p>By: {i.ownerName}</p>
                                <p>Catagories: {i.catagoryList}</p>
                                <p>Desc: {i.description}</p>
                            </div>
                        </Link>
                        <hr />
                    </div>


                ))}
            </div>
        </div>
    )
}

export default RenovationDashboard;