import { useEffect, useState } from "react";
import { Category, Product } from "../types/types";

export default function AdminProduct(props: any) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState(props.name)
    const [image, setImage] = useState(props.image)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [category, setCategory] = useState(props.fk_category)
    const [id, setId] = useState(0)
    
    const apiUrl = 'http://localhost:8080/api/products';

    const handleApiCall = async (method: string, urlExtension = '', bodyData: { 
        name: string, 
        description: string,
        image: string,
        fk_category: number,
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

    const path = window.location.pathname.split("/");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${path[3]}`);
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                // holy fucking shit im retarded (and on a tight deadline)
                setName(data.data[0].name);
                setDescription(data.data[0].description);
                setImage(data.data[0].image);
                setPrice(data.data[0].price)
                setCategory(data.data[0].fk_category);
                setId(data.data[0].id)
            } catch (error) {
                console.error('admin - error fetching category: ', error);
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
        fetchCategories();
        fetchCategory();
    }, [])
    
    return <>
        <div className="login-form">
            <a>{id}</a>

            <input value={name} className="form-control" onChange={ev => setName(ev.target.value)}></input>

            <textarea value={description} className="form-control" onChange={ev => setDescription(ev.target.value)}></textarea>

            <input value={image} className="form-control" onChange={ev => setImage(ev.target.value)}></input>

            <input value={price} className="form-control" type="number" onChange={ev => setPrice(parseFloat(ev.target.value))}></input>

            <select value={category} className="form-select" onChange={ev => setCategory(ev.target.value)}>
                {categories.map((categor) => (
                    <option value={categor.id}>
                        {categor.name}
                    </option>
                ))}
            </select>

            <button className="btn btn-warning" onClick={() => 
                handleApiCall('PUT', `${id}`, { 
                    name: name,
                    description: description,
                    image: image,
                    price: price,
                    fk_category: category,
                })}>Update
            </button>

            <button className="btn btn-danger" onClick={() => 
                handleApiCall('DELETE', `${props.id}`)}>Delete
            </button>

            <a href="/admin/products" className="btn btn-primary">Back</a>
        </div>
    </>
}