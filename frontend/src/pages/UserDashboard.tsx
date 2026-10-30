import { Link } from "react-router-dom";

function UserDashboard() {
    // TODO: API call: get feed
    // TODO: API call: get Followings
    return (
        <div className="paddedSection1 baseBackground">
            <div className="headerSection1">
                <h1>Welcome [Enter Name Here]</h1>

            </div>
            <div className="subHeaderSection1">
                <h5>Feed</h5>
                <div>
                    <Link to="/RenovationDashboard"><button className="buttonStyle2">My Renovations</button></Link>
                    <Link to="/Messages"><button className="buttonStyle2">My Messages</button></Link>
                </div>
            </div>
            <div className="contentSection1">
                <div className="contentSectionSplitLarger">
                    <p>Coming soon</p>
                </div>
                <div>
                    <div className="likedCard">
                        <h5>Following</h5>
                        <hr/>
                        <p>Coming soon</p>
                        
                    </div>
                    <br/>
                    <Link to="/Liked"><button className="buttonStyle2">Liked Renovations</button></Link>
                </div>
            </div>




        </div>
    )
}

export default UserDashboard;