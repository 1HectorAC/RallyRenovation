import { useEffect, useState } from "react";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import RenovationCard from "../components/RenovationCard";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Liked() {
    const [renovations, setRenovations] = useState<renovationShortType[]>([]);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { user } = useAuth();
    useEffect(() => {
        const fetchLiked = async () => {
            try {
                if (user == null)
                    throw Error("Error with Auth check");

                const data: renovationShortType[] = await RenovationService.getLikedByUser(user?.token);
                setRenovations(data);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchLiked();

    }, [])
    return (
        <div className="paddedSection1 baseBackground">
            <div className="centerSection">
                <h1>Liked Renovations</h1>
                <p>/ <Link to="/Dashboard">Home</Link> / Liked Renovations</p>
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

export default Liked;