import { useEffect, useState } from "react";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import RenovationCard from "../components/RenovationCard";

function BrowseRenovation() {
    const [renovations, setRenovations] = useState<renovationShortType[]>([]);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchRenovations = async () => {
            try {
                const data: renovationShortType[] = await RenovationService.getAll();
                setRenovations(data);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchRenovations();
    }, []);
    return (
        <div className="centerContainer">
            <div className="centerSection">
                <h1>Browse Renovations</h1>
                <br />
                {error && <p>{error}</p>}
                {isLoading && <p>Loading...</p>}
                <div>
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

        </div>
    )
}

export default BrowseRenovation;