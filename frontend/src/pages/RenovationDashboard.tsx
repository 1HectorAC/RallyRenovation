import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";
import RenovationCard from "../context/RenovationCard";

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
                    <RenovationCard
                        key={x}
                        id={i.id}
                        title={i.title}
                        description={i.description}
                        ownerName={i.ownerName}
                        catagoryList={i.catagoryList}
                        url={`/Renovation/${i.id}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default RenovationDashboard;