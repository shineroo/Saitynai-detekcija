import ProfileView from "../components/ProfileView"

export default function Profile() {
    let component
    const path = window.location.pathname.split("/")
    switch(path[2]) {
        case "edit":
            //component = <AdminCategories/>
            break
        case "orders":
            //component = <AdminProducts/>
            break
        default:
            component = <ProfileView/>
            break
    }

    return <>
        <div className="profile-panel">
            <ul>
                <li>
                    <a href="/profile">View Profile Information</a>
                </li>
                <li>
                    <a href="/profile/orders">View Orders</a>
                </li>
            </ul>
        </div>
        {component}
    </>
}