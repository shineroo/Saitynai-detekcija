import { useEffect, useState } from "react";
import { Category } from "../types/types";
import AdminCategory from "./AdminCategory";

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("")
    
    const path = window.location.pathname.split("/")
    const apiUrl = 'http://localhost:8080/api/categories';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const category_response = await fetch('http://localhost:8080/api/categories');
                if (!category_response.ok) {
                    throw new Error('response was not ok');
                }
                const category_data = await category_response.json();
                setCategories(category_data.data);
            } catch (error) {
                console.error('catalog - error fetching products: ', error);
            }
        }
        fetchProducts();
    }, [])

    const handleApiCall = async (method: string, urlExtension = '', bodyData: { name: string,} | null = null) => {
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

    
    return <>
        <h1>Categories</h1>
        <table className="admin-table table">
            <tr>
                <th>id</th>
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
                    <button className="btn btn-primary" onClick={() => 
                        handleApiCall('POST', ``, { name: name})}>Create
                    </button>
                </th>
                <th>#</th>
            </tr>
            {categories.map((category) => (
                    <AdminCategory
                        id={category.id}
                        name={category.name}
                    />
                ))}
        </table>
    </>
}