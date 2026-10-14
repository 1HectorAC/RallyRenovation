import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RenovationService, type renovationType } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";

//TODO: check if user owns renovation if private

function Renovation() {
    const { id } = useParams();
    const [renovation, setRenovation] = useState<renovationType | null>();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isFollowingOnwer, setIsFollowingOwner] = useState<boolean>(false);
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
    };

    async function onLike(){
        try{
            if(!user || !renovation)
                throw Error();
            await RenovationService.like(user?.token,Number(renovation?.id));

            setIsLiked(true);

        } catch(err){
            if(err instanceof Error)
                setError(err.message);
        }
    };

    async function onUnlike(){
        try{
            if(!user || !renovation)
                throw Error();
            await RenovationService.unlike(user?.token,Number(renovation?.id));

            setIsLiked(false);

        } catch(err){
            if(err instanceof Error)
                setError(err.message);
        }
    };

    useEffect(() => {
        const fetchRenovation = async () => {
            try {
                const token = user?.token ?? null;
                const data: renovationType = await RenovationService.get(token, Number(id));
                setRenovation(data);
                setIsLiked(data.isLiked);
                setIsFollowingOwner(data.isFollowingOnwer);
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
                    {renovation?.accessedByOwner ?
                        <span>
                            <Link to={`/RenovationEdit/${id}`}><button className="btn btn-primary">Edit</button></Link>
                            <button onClick={onClickDelete} className="btn btn-primary">Delete</button>
                        </span>
                        :
                        <span>
                            {isLiked ?
                                <button className="btn btn-primary" onClick={onUnlike}>Unlike</button> :
                                <button className="btn btn-primary" onClick={onLike}>Like</button>
                            }

                            {isFollowingOnwer ?
                                <button className="btn btn-primary">UnFollowing</button> :
                                <button className="btn btn-primary">Follow</button>
                            }

                        </span>
                    }

                </div>
            }


            <p>id: {id} </p>
            {error && <p className="error">{error}</p>}
            {isLoading && <p>Loading...</p>}

            {renovation && (
                <div>
                    <p>Title: {renovation.title}</p>
                    <p>By: {renovation.ownerName} | {renovation.userId}</p>
                    <p>Description: {renovation.description}</p>
                    <p>IsPrivate: {renovation.isPrivate ? "true" : "false"}</p>
                    <p>Date: {renovation.date}</p>
                    <p>catagories: {renovation.catagoryList}</p>
                    <p>Cost: {renovation.cost?.toString() ?? ""}</p>
                    <p>Total Days:{renovation.totalDays?.toString() ?? ""}</p>
                    <p>Company: {renovation.company}</p>
                    <p>Location: {renovation.location}</p>
                    <p>Before Images:{renovation.beforeImageList}</p>
                    <p>After Images:{renovation.afterImageList}</p>
                    <p>TotalLIkes: {renovation.totalLikes.toString()} </p>
                    <p>AccessedByOwner: {renovation.accessedByOwner ? "true" : "false"}</p>

                </div>
            )}

        </div>
    )
}

export default Renovation;