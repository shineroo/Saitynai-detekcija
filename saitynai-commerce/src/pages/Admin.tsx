import CategoryButtons from "../components/CategoryButtons";
import ProductButtons from "../components/ProductButtons";
import ReviewButtons from "../components/ReviewButtons";
import AdminCategories from "../components/AdminCategories";
import AdminProducts from "../components/AdminProducts";
import AdminReviews from "../components/AdminReviews";

export default function  Admin() {
    var categoriesSelected = false;
    var productsSelected = false;
    var reviewsSelected = false;

    let component
    const path = window.location.pathname.split("/")
    
    switch(path[2]) {
        case "categories":
            categoriesSelected = true;
            component = <AdminCategories/>
            break
        case "products":
            productsSelected = true;
            component = <AdminProducts/>
            break
        case "reviews":
            reviewsSelected = true;
            component = <AdminReviews/>
            break
        default:
            categoriesSelected = true;
            component = <AdminCategories/>
            break
    }

    return <>

        <div className="page-container" style={{marginTop: 20, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <div className="admin-panel">
                    <ul>
                        <li className={categoriesSelected ? 'active' : ''} onClick={() => (window.location.href = "/admin/categories")}>
                            <a href="/admin/categories">Categories</a>
                        </li>
                        <li className={productsSelected ? 'active' : ''} onClick={() => (window.location.href = "/admin/products")}>
                            <a href="/admin/products">Products</a>
                        </li>
                        <li className={reviewsSelected ? 'active' : ''} onClick={() => (window.location.href = "/admin/reviews")}>
                            <a href="/admin/reviews">Reviews</a>
                        </li>
                    </ul>
            </div>
            <div className="col">
                {component}
            </div>
        </div>
    </>
}