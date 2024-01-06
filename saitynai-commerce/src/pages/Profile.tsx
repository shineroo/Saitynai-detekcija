import ProfileView from "../components/ProfileView"
import UnderConstruction from "../components/UnderConstruction"

export default function Profile() {
    var profileActive = false;
    var ordersActive = false;

    let component
    const path = window.location.pathname.split("/")
    switch(path[2]) {
        case "edit":
            profileActive = true;
            component = <UnderConstruction/>
            break
        case "orders":
            ordersActive = true;
            component = <UnderConstruction/>
            break
        default:
            profileActive = true;
            component = <ProfileView/>
            break
    }

    return <>
        <div className="page-container">
        <div className="container" style={{marginTop: 20}}>
            <div className="row">
                <div className="col-4 panel">
                    <ul>
                        <li className={profileActive ? 'active' : ''} onClick={() => (window.location.href = "/profile")}>
                            <a href="/profile">View Profile Information</a>
                        </li>
                        <li className={ordersActive ? 'active' : ''} onClick={() => (window.location.href = "/profile/orders")}>
                            <a href="/profile/orders">View Orders</a>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    {component}
                </div>
            </div>
            
        </div>
        </div>
    </>
}