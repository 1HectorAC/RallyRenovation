import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RenovationService } from "../services/RenovationService";
import { useAuth } from "../hooks/useAuth";

function CreateRenovation() {
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useAuth();


    async function handleSubmit(e: React.ChangeEvent) {
        e.preventDefault();
        setIsLoading(true);
        if (title == "" || description == "") {
            setError("All required fields arent set.");
            return;
        }
        try {
            var data = { title, description, isPrivate, catagoryList, cost, totalDays, company, location, beforeImageList, afterImageList };
            if (user == null)
                throw Error("Error with Authentication.");
            await RenovationService.add(user?.token, data)

            // TODO: redirecting to modal and then redirect elsewhere
            navigate("/RenovationDashboard");
        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }

    }
    return (
        <div className="paddedSection1 baseBackground">
            <div className="headerSection1">
                <h1>Create Renovation</h1>
            </div>
            <div className="subHeaderSection2">
                <p>/ <Link to="/Dashboard">Home</Link> / <Link to="/RenovationDashboard">MyRenovations</Link> / Create</p>
            </div>

            {error ?? <p className="error">{error}</p>}
            {isLoading ?? <p>Loading...</p>}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-9">
                        <label htmlFor="title">Title</label>
                        <input name="title"
                            className="form-control"
                            type="text" value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Ex. Awsome Green Repaint of Living Room" />
                    </div>
                    <div className="col-md-2">

                        <input type="checkbox"
                            className="form-check-input"
                            name="isPrivate"
                            checked={isPrivate}
                            onChange={e => setIsPrivate(e.target.checked)} />
                        <label htmlFor="isPrivate" className="form-check-label">
                            Private
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description">Description</label>
                        <textarea name="description"
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Ex. living room house repaint to green" />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="catagoryList">catagories</label>
                        <input name="catagoryList"
                            className="form-control"
                            type="text"
                            value={catagoryList}
                            onChange={e => setCatagoryList(e.target.value)}
                            placeholder="Ex. repaint, indoor" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="totalDays">Total Days</label>
                        <input name="totalDays"
                            className="form-control"
                            type="number"
                            value={totalDays}
                            onChange={e => setTotalDays(Number(e.target.value))} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cost">Cost($)</label>
                        <input name="cost"
                            className="form-control"
                            type="number"
                            value={cost}
                            onChange={e => setCost(Number(e.target.value))} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="company">Company</label>
                        <input name="company"
                            className="form-control"
                            type="text" value={company}
                            onChange={e => setCompany(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="location">Location</label>
                        <input name="location"
                            className="form-control"
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="beforeImageList">BeforeImageList</label>
                        <input name="beforeImageList"
                            className="form-control"
                            type="text"
                            value={beforeImageList}
                            onChange={e => setBeforeImageList(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="afterImageList">AfterImageList</label>
                        <input name="afterImageList"
                            className="form-control"
                            type="text"
                            value={afterImageList}
                            onChange={e => setAfterImageList(e.target.value)} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <br />
                        <button className="buttonStyle1" type="submit">Submit</button>

                    </div>
                </div>
            </form>


        </div>
    )
}

export default CreateRenovation;