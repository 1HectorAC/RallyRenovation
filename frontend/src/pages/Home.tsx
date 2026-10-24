import { Link } from 'react-router-dom';
import houseImage from '../assets/houseWithHammerv2.png'
function Home() {
    return (
        <div>
            <div className="heroSection">
                <div className="heroTextSection">
                    <h1>Share Your Fix</h1>
                    <h5>Showcase your house remodels and view others.</h5>
                    <Link to="/login"><button className='heroButton'>Start Now</button></Link>
                </div>
                <div className="heroImageSection">
                    <img src={houseImage} className=' heroImage' width="400" />
                </div>
            </div>
            <div className='recentPostSection'>
                <p>~ Recent Posted Renovations ~</p>
                <p>coming soon</p>
                <Link to="/Renovations">
                    <button className='buttonStyle2'>
                        Browse More
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default Home;