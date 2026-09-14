import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RenovationService, type renovationType } from "../services/RenovationService";

function EditRenovation() {
    const { id } = useParams();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(true);
    const [catagoryList, setCatagoryList] = useState<string>("");
    const [cost, setCost] = useState<number>();
    const [totalDays, setTotalDays] = useState<number>();
    const [company, setCompany] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [beforeImageList, setBeforeImageList] = useState<string>("");
    const [afterImageList, setAfterImageList] = useState<string>("");

    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    async function handleSubmit(e: React.ChangeEvent) {
        e.preventDefault();
        setIsLoading(true);
        if (title == "" || description == "") {
            setError("Title and Description are required.");
            return;
        }
        try {
            var data = { title, description, isPrivate, catagoryList, cost, totalDays, company, location, beforeImageList, afterImageList };
            if (user == null)
                throw Error("Error with Authentication.");
            await RenovationService.edit(user?.token, Number(id), data)

            // TODO: redirecting to modal and then redirect elsewhere
            navigate("/RenovationDashboard");
        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }
    }
    useEffect(() => {
        const fetchRenovation = async () => {
            try {
                const token = user?.token ?? null;
                const data: renovationType = await RenovationService.get(token, Number(id));
                setTitle(data.title);
                setDescription(data.description);
                setIsPrivate(data.isPrivate);
                setCatagoryList(data.catagoryList ?? "");
                if(data.cost)
                    setCost(Number(data.cost));
                if(data.totalDays)
                    setTotalDays(Number(data.totalDays));
                setCompany(data.company ?? "");
                setLocation(data.location ?? "");
                setBeforeImageList(data.beforeImageList ?? "");
                setAfterImageList(data.afterImageList ?? "");

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
            <h1>Edit Renovation</h1>
            {error ?? <p className="error">{error}</p>}
            {isLoading ?? <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title</label>
                    <input name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">description</label>
                    <input name="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="isPrivate">
                        <input type="checkbox" name="isPrivate" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
                        IsPrivate
                    </label>
                </div>
                <div>
                    <label htmlFor="catagoryList">catagoryList</label>
                    <input name="catagoryList" type="text" value={catagoryList} onChange={e => setCatagoryList(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="totalDays">Total Days</label>
                    <input name="totalDays" type="number" value={totalDays} onChange={e => setTotalDays(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="cost">Cost</label>
                    <input name="cost" type="number" value={cost} onChange={e => setCost(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="company">company</label>
                    <input name="company" type="text" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="location">location</label>
                    <input name="location" type="text" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="beforeImageList">beforeImageList</label>
                    <input name="beforeImageList" type="text" value={beforeImageList} onChange={e => setBeforeImageList(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="afterImageList">afterImageList</label>
                    <input name="afterImageList" type="text" value={afterImageList} onChange={e => setAfterImageList(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditRenovation;