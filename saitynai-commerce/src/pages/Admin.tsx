import CategoryButtons from "../components/CategoryButtons";
import ProductButtons from "../components/ProductButtons";
import ReviewButtons from "../components/ReviewButtons";
import AdminCategories from "../components/AdminCategories";
import AdminProducts from "../components/AdminProducts";
import AdminReviews from "../components/AdminReviews";

export default function  Admin() {
    let component
    const path = window.location.pathname.split("/")
    
    switch(path[2]) {
        case "categories":
            component = <AdminCategories/>
            break
        case "products":
            component = <AdminProducts/>
            break
        case "reviews":
            component = <AdminReviews/>
            break
        default:
            component = <AdminCategories/>
            break
    }

    return <>
        <div className="admin-panel">
            <div className="admin-panel-select">.
                <ul>
                    <li>
                        <a href="/admin/categories">Categories</a>
                    </li>
                    <li>
                        <a href="/admin/products">Products</a>
                    </li>
                    <li>
                        <a href="/admin/reviews">Reviews</a>
                    </li>
                </ul>
            </div>
            <div className="admin-panel-content">
                {component}
            </div>
        </div>
    </>
}