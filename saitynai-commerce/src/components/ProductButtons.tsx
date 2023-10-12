import React, { useState, ChangeEvent } from 'react';
import Input from './Input';

// what the fuck. i mean this kind of makes sense but there is most definetly an easier way of doing this
// or maybe not, this is the best i can come up with regardless and its not horrible i think
function ProductButtons(props: any) {
const [nameValue, setNameValue] = useState("");
const [descriptionValue, setDescriptionValue] = useState("");
const [imageValue, setImageValue] = useState("");
const [categoryId, setCategoryId] = useState("");
const [productId, setProductId] = useState("");

const apiUrl = 'http://localhost:3001/api/products';

const handleApiCall = async (method: string, urlExtension = '', bodyData: { 
        name: string, 
        description: string,
        image: string,
        fk_category: string 
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
            props.handleResponse({ status: response.status, data: null });
            throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        props.handleResponse({ status: response.status, data: result });
    } catch (error) {
        console.error('Error:', error);
    }
    };

const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value); // Update the state in App with the value from MyComponent
};

const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value); 
};
const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageValue(event.target.value);  
};
const handleCategoryId = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryId(event.target.value); 
};
const handleProductId = (event: ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value); 
};

return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'column'}}>
        <button onClick={() => 
            handleApiCall('POST', '', { 
                name: nameValue,
                description: descriptionValue,
                image: imageValue,
                fk_category: categoryId
            })
        }>
            Create a new product
        </button>
        <button onClick={() => handleApiCall('GET', `?page=${parseInt(productId)}`)}>Get multiple products</button>
        <button onClick={() => 
            handleApiCall('PUT', `${productId}`, { 
                name: nameValue,
                description: descriptionValue,
                image: imageValue,
                fk_category: categoryId
            })
        }>
            Update product
        </button>
        <button onClick={() => handleApiCall('DELETE', `${productId}`)}>Delete product</button>
        <button onClick={() => handleApiCall('GET', `${productId}`)}>Get product</button>
    </div>

        <Input
            type="text"
            label="name"
            value={nameValue}
            onChange={handleNameChange}
            placeholder="name"
        /> 
        <Input
            type="text"
            label="description"
            value={descriptionValue}
            onChange={handleDescriptionChange}
            placeholder="description"
            /> 
        <Input
            type="text"
            label="image"
            value={imageValue}
            onChange={handleImageChange}
            placeholder="image"
        /> 
        <Input
            type="text"
            label="category id"
            value={categoryId}
            onChange={handleCategoryId}
            placeholder="category id"
        /> 
        <Input
            type="text"
            label="product id"
            value={productId}
            onChange={handleProductId}
            placeholder="product id"
        /> 
    </div>
);
}

export default ProductButtons;
