import { Link } from "react-router-dom";

function UserDashboard(){
    // TODO: API call: get feed
    // TODO: API call: get Followings
    return(
        <div>
            <h1>User Dashboard</h1>
            <Link to="/RenovationDashboard"><button>My Renovations</button></Link>
            <Link to="/Messages"><button>My Messages</button></Link>
            <Link to="/Liked"><button>Liked</button></Link>
            <div>
                <h5>Feed</h5>
            </div>
            <div>
                <h5>List of Following</h5>
            </div>


        </div>
    )
}

export default UserDashboard;