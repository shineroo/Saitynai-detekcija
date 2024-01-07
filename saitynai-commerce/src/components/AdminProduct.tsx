import { useEffect, useState } from "react";
import { Category, Product } from "../types/types";
import { Modal } from "react-bootstrap";

export default function AdminProduct(props: Product) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [category, setCategory] = useState("")
    
    const apiUrl = 'http://localhost:8080/api/products';
    const href = "/admin/products/" + props.id;

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

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/categories/${props.fk_category}`);
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                setCategory(data.data[0].name);
            } catch (error) {
                console.error('admin - error fetching category: ', error);
            }
        }
        fetchCategory();
    }, [])
    
    return <>
        <tr>
            <th>
                {props.id}
            </th>
            <th>
                <img src={props.image} width={100}/>
            </th>
            <th>
                {props.name}
            </th>
            <th>
                {props.description.length > 70 ? `${props.description.substring(0, 70)}...` : props.description}
            </th>
            <th>
                {props.price}
            </th>
            <th>
                {category}
            </th>

            <th>
                <a className="btn btn-warning" href={href}>Edit</a>
            </th>
            <th>
                <button className="btn btn-danger" onClick={handleShow}>Delete</button>
            </th>
        </tr>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're about to delete this product!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>Back</button>
          <button className="btn btn-danger" onClick={() => 
            handleApiCall('DELETE', `${props.id}`)}>Delete
        </button>
        </Modal.Footer>
      </Modal>
    </>
}