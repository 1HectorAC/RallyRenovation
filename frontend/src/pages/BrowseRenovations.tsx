import { useEffect, useState } from "react";
import { RenovationService, type renovationType } from "../services/RenovationService";

function BrowseRenovation() {
    const [renovations, setRenovations] = useState<renovationType[]>([]);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchRenovations = async () => {
            try {
                const data: renovationType[] = await RenovationService.getAll();
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
            <hr/>
            {error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            <div>

                {renovations.map((i, x) => (
                    <div key={x}>
                        <p>id: {i.id.toString()}</p>
                        <p>Title: {i.title}</p>
                        <p>Desc: {i.description}</p>
                        <p>IsPrivate: {i.isPrivate ? "true" : "false"}</p>
                        <hr/>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default BrowseRenovation;