import { useEffect, useState } from "react";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import RenovationCard from "../context/RenovationCard";

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
        <div>
            <h1>Browse Renovations</h1>
            <hr />
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
                        url={`/Renovation/${i.id}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default BrowseRenovation;