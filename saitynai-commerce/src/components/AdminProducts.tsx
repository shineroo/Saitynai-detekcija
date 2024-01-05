import { useEffect, useState } from "react";
import { Category, Product } from "../types/types";
import AdminCategory from "./AdminCategory";
import AdminProduct from "./AdminProduct";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [description, setDesciption] = useState("")
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    
    const path = window.location.pathname.split("/")
    const apiUrl = 'http://localhost:8080/api/products';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products');
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error('catalog - error fetching products: ', error);
            }
        }
        fetchProducts();
    }, [])

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

    
    return <>
        <h1>Products</h1>
        <table className="admin-table table">
            <tr>
                <th>id</th>
                <th>name</th>
                <th>description</th>
                <th>image</th>
                <th>price</th>
                <th>category</th>
                <th>#</th>
                <th>#</th>
            </tr>            
            <tr>
                <th>create new</th>
                <th>
                    <input value={name} className="form-control" onChange={ev => setName(ev.target.value)}></input>
                </th>
                <th>
                    <input value={description} className="form-control" onChange={ev => setDesciption(ev.target.value)}></input>
                </th>
                <th>
                    <input value={image} className="form-control" onChange={ev => setImage(ev.target.value)}></input>
                </th>
                <th>
                    <input value={price} className="form-control" type="number" onChange={ev => setPrice(parseFloat(ev.target.value))}></input>
                </th>
                <th>
                    <input value={category} className="form-control" onChange={ev => setCategory(ev.target.value)}></input>
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
    </>
}