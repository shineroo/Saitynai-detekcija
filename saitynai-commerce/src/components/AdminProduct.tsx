import { useState } from "react";
import { Category, Product } from "../types/types";

export default function AdminProduct(props: Product) {
    const [name, setName] = useState(props.name)
    const [image, setImage] = useState(props.image)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [category, setCategory] = useState(props.fk_category)
    
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
    
    return <>
        <tr>
            <th>
                {props.id}
            </th>
            <th>
                <input value={name} className="form-control" onChange={ev => setName(ev.target.value)}></input>
            </th>
            <th>
                <input value={description} className="form-control" onChange={ev => setDescription(ev.target.value)}></input>
            </th>
            <th>
                <input value={image} className="form-control" onChange={ev => setImage(ev.target.value)}></input>
            </th>
            <th>
                <input value={price} className="form-control" type="number" onChange={ev => setPrice(parseFloat(ev.target.value))}></input>
            </th>
            <th>
                <input value={category} className="form-control" type="number" onChange={ev => setCategory(parseInt(ev.target.value))}></input>
            </th>

            <th>
                <button className="btn btn-warning" onClick={() => 
                    handleApiCall('PUT', `${props.id}`, { 
                        name: name,
                        description: description,
                        image: image,
                        price: price,
                        fk_category: category,
                    })}>Update
                </button>
            </th>
            <th>
                <button className="btn btn-danger" onClick={() => 
                    handleApiCall('DELETE', `${props.id}`)}>Delete
                </button>
            </th>
        </tr>
    </>
}