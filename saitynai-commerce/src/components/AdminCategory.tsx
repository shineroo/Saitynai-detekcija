import { useState } from "react";
import { Category } from "../types/types";

export default function AdminCategory(props: Category) {
    const [name, setName] = useState(props.name)
    
    const apiUrl = 'http://localhost:8080/api/categories';

    const handleApiCall = async (method: string, urlExtension = '', bodyData: { name: string,} | null = null) => {
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
                <button className="btn btn-warning" onClick={() => 
                    handleApiCall('PUT', `${props.id}`, { name: name})}>Update</button>
            </th>
            <th>
            <button className="btn btn-danger" onClick={() => 
                    handleApiCall('DELETE', `${props.id}`)}>Delete</button>
            </th>
        </tr>
    </>
}