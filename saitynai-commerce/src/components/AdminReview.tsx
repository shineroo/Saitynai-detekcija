import { useState } from "react";
import { Category, Review } from "../types/types";
import Modal from 'react-bootstrap/Modal';

export default function AdminCategory(props: Review) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const apiUrl = 'http://localhost:8080/api/reviews';

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
                {props.author}
            </th>
            <th>
                {props.text}
            </th>
            <th>
                {props.rating}
            </th>
            <th>
                <button className="btn btn-danger" onClick={handleShow}>Delete</button>
            </th>
        </tr>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're about to delete this review!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>Back</button>
          <button className="btn btn-danger" onClick={() => 
            handleApiCall('DELETE', `${props.id}`)}>Delete
        </button>
        </Modal.Footer>
      </Modal>
    </>
}