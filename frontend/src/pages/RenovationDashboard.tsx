import { Link } from "react-router-dom";

function RenovationDashboard(){
    return(
        <div>
            <h1>Renovations Dasboard</h1>
            <Link to="/RenovationCreate"><button>Add</button></Link>
            <div>
                <h5>Some Stats</h5>
            </div>
            <div>
                <h5>My Renovation</h5>
            </div>
        </div>
    )
}

export default RenovationDashboard;