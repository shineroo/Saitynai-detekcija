import { useEffect, useState } from "react";
import { Category, Product } from "../types/types";
import AdminCategory from "./AdminCategory";
import AdminProduct from "./AdminProduct";
import AdminProductEdit from "./AdminProductEdit";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("1");
    
    const [page, setPage] = useState(1);
    const [productCount, setProductCount] = useState(0);
    const path = window.location.pathname.split("/");
    const apiUrl = 'http://localhost:8080/api/products';

    function extractPageFromURL() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('page');
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products?page=${page}`);
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                setProductCount(data.meta.product_count);
                setProducts(data.data);
            } catch (error) {
                console.error('admin - error fetching products: ', error);
            }
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/categories`);
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                setCategories(data.data);
            } catch (error) {
                console.error('admin - error fetching products: ', error);
            }
        }


        var currentPage = extractPageFromURL();
        if (currentPage != null) {
            setPage(parseInt(currentPage));
        }
        fetchProducts();
        fetchCategories();
    }, [page])

    const handleApiCall = async (method: string, urlExtension = '', bodyData: { 
        name: string, 
        description: string,
        image: string,
        fk_category: string,
        price: number 
    } | null = null) => {
        try {
            const requestOptions = {
                method: method, // GET, PUT, POST, DELETE
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['token']}`
                },
                body: bodyData ? JSON.stringify(bodyData) : null, // null if null, json stringified if not.
            };
            
            // url extension so it goes to apiUrl (/api/categories/) and appends url extension
            // which is either empty or relevant info like id or ?page=x
            const response = await fetch(`${apiUrl}/${urlExtension}`, requestOptions); 
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            window.location.reload()
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const totalPages = Math.ceil(productCount / 12); 
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const loopWithCurlyBraces = pageNumbers.map((pageNumber) => {        
        return <li className='page-item'><a href={window.location.pathname + `?page=${pageNumber}`} className='page-link'>{pageNumber}</a></li>;
    
    
    });
    
    return <>
        {path[3] == null &&
            <>
            <h1>Products</h1>
            <div className='catalog-pages'>
                <ul className="pagination">
                    {loopWithCurlyBraces}
                </ul>
            </div>
            <table className="admin-table table">
                <tr>
                    <th>id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>#</th>
                    <th>#</th>
                </tr>            
                <tr className="first-row">
                    <th >create new</th>
                    <th className="admin-image">
                        <input value={image} className="form-control" onChange={ev => setImage(ev.target.value)}></input>
                    </th>
                    <th className="admin-name">
                        <input value={name} className="form-control" onChange={ev => setName(ev.target.value)}></input>
                    </th>
                    <th className="admin-description">
                        <textarea value={description} className="form-control" onChange={ev => setDescription(ev.target.value)} style={{height: 42}}></textarea>
                    </th>
                    <th className="admin-price">
                        <input value={price} className="form-control" type="number" onChange={ev => setPrice(parseFloat(ev.target.value))}></input>
                    </th>
                    <th className="admin-category">
                        <select value={category} className="form-select" onChange={ev => setCategory(ev.target.value)}>
                            {categories.map((categor) => (
                                <option value={categor.id}>
                                    {categor.name}
                                </option>
                            ))}
                        </select>
                    </th>
                    <th>
                        <button className="btn btn-primary" onClick={() => 
                            handleApiCall('POST', ``, { 
                                name: name,
                                description: description,
                                image: image,
                                price: price,
                                fk_category: category,
                            })}>Create
                        </button>
                    </th>
                    <th>#</th>
                </tr>
                {products.map((product) => (
                        <AdminProduct
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            image={product.image}
                            price={product.price}
                            fk_category={product.fk_category}
                        />
                    ))}
            </table>
            <div className='catalog-pages'>
                <ul className="pagination">
                    {loopWithCurlyBraces}
                </ul>
            </div>
            </>
        }
        { path[3] != null &&
            <AdminProductEdit
                props={path[3]}
            />
        }
        
    </>
}