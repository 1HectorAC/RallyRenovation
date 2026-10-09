import { useEffect, useState } from "react";
import { RenovationService, type renovationShortType } from "../services/RenovationService";
import { Link } from "react-router-dom";

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
                    <div key={x}>
                        <Link to={`/Renovation/${i.id}`}>
                            <p>id: {i.id.toString()}</p>
                            <p>Title: {i.title}</p>
                            <p>Desc: {i.description}</p>
                            <p>OwnerName: {i.ownerName}</p>
                            <p>Catagory: {i.catagoryList}</p>
                        </Link>

                        <hr />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default BrowseRenovation;