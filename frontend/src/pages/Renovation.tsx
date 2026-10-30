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

    async function onLike() {
        try {
            if (!user || !renovation)
                throw Error();
            await RenovationService.like(user?.token, Number(renovation?.id));

            setIsLiked(true);

        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }
    };

    async function onUnlike() {
        try {
            if (!user || !renovation)
                throw Error();
            await RenovationService.unlike(user?.token, Number(renovation?.id));

            setIsLiked(false);

        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }
    };
    async function onFollow() {
        try {
            if (!user || !renovation || renovation.userId == null)
                throw Error();
            await RenovationService.follow(user?.token, renovation?.userId);
            setIsFollowingOwner(true);
        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }
    };
    async function onUnfollow() {
        try {
            if (!user || !renovation || renovation.userId == null)
                throw Error();
            await RenovationService.unfollow(user?.token, renovation?.userId);
            setIsFollowingOwner(false);
        } catch (err) {
            if (err instanceof Error)
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
            <div className="headerSectionRenovation paddedSection1">
                <div>
                    <h1>Renovation</h1>

                </div>

                <p style={{ margin:"0px"}}>{renovation?.isPrivate ? "private" : "public"}</p>
                <p style={{ margin:"0px"}}>{renovation?.totalLikes.toString()} Likes</p>
                <div>
                    
                    {isAuthenticated &&
                        <div>
                            {renovation?.accessedByOwner ?
                                <span>
                                    <Link to={`/RenovationEdit/${id}`}><button className="buttonStyle2">Edit</button></Link>
                                    <button onClick={onClickDelete} className="buttonStyle2">Delete</button>
                                </span>
                                :
                                <span>
                                    {isLiked ?
                                        <button className="buttonStyle2" onClick={onUnlike}>Unlike</button> :
                                        <button className="buttonStyle2" onClick={onLike}>Like</button>
                                    }

                                    {isFollowingOnwer ?
                                        <button className="buttonStyle2" onClick={onUnfollow}>UnFollowing</button> :
                                        <button className="buttonStyle2" onClick={onFollow}>Follow</button>
                                    }

                                </span>
                            }

                        </div>
                    }
                </div>
            </div>
            <div className="renovationContentSection paddedSection1">
                {error && <p className="error">{error}</p>}
                {isLoading && <p>Loading...</p>}

                {renovation && (
                    <div>
                        <h5>{renovation.title}</h5>
                        <p className="subHeaderGrey">By: {renovation.ownerName}</p>
                        <p className="subHeaderGrey">Posted: {renovation.date}</p>
                        <p>catagories: {renovation.catagoryList}</p>
                        <p>Description: {renovation.description}</p>
                        <span className="sectionEqualSpace">
                            <p>Cost: {renovation.cost?.toString() ?? "N/A"}</p>
                            <p>Total Days:{renovation.totalDays?.toString() ?? "N/A"}</p>
                            <p>Company: {renovation.company ?? "N/A"} </p>
                            <p>Location: {renovation.location ?? "N/A"} </p>
                        </span>
                        <p>Before Images:{renovation.beforeImageList}</p>
                        <p>After Images:{renovation.afterImageList}</p>
                    </div>
                )}
            </div>
            <div className="commentSection paddedSection1">
                <h5>Comments</h5>
                <p>Coming soon</p>
            </div>

        </div>
    )
}

export default Renovation;