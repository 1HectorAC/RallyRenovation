import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";
import RenovationCard from "../components/RenovationCard";

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
        <div className="paddedSection1 baseBackground">
            <div className="headerSection1">
                <h1>My Renovations</h1>
            </div>
            <div className="subHeaderSection1">
                <p>/ <Link to="/Dashboard">Home</Link> / MyRenovations</p>
                <Link to="/RenovationCreate"><button className="buttonStyle2">Add</button></Link>
            </div>

            <div>
                <h5>Stats</h5>
                <p>Coming soon</p>
            </div>
            <div>
                <h5>Renovations</h5>
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
                    />
                ))}
            </div>
        </div>
    )
}

export default RenovationDashboard;