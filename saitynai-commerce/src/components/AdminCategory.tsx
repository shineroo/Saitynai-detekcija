import { useState } from "react";
import { Category } from "../types/types";
import { Modal } from "react-bootstrap";

export default function AdminCategory(props: Category) {
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState(props.name)
    
    const apiUrl = 'http://localhost:8080/api/categories';

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
        <tr>
            <th>
                {props.id}
            </th>
            <th>
                <input value={name} className="form-control" onChange={ev => setName(ev.target.value)}></input>
            </th>
            <th>
                <button className="btn btn-warning" onClick={handleShow2}>Update
                </button>
            </th>
            <th>
                <button className="btn btn-danger" onClick={handleShow}>Delete</button>
            </th>
        </tr>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You're about to delete this category!</Modal.Body>
            <Modal.Footer>
            <button className="btn btn-primary" onClick={handleClose}>Back</button>
            <button className="btn btn-danger" onClick={() => 
                handleApiCall('DELETE', `${props.id}`)}>Delete
            </button>
            </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You're about to update this category!</Modal.Body>
            <Modal.Footer>
            <button className="btn btn-primary" onClick={handleClose2}>Back</button>
            <button className="btn btn-warning" onClick={() => 
                handleApiCall('PUT', `${props.id}`, { name: name})}>Update
            </button>
            </Modal.Footer>
        </Modal>
    </>
}