import React, { useState, ChangeEvent } from 'react';
import Input from './Input';

// what the fuck. i mean this kind of makes sense but there is most definetly an easier way of doing this
// or maybe not, this is the best i can come up with regardless and its not horrible i think
function ReviewButtons(props: any) {
const [authorValue, setAuthorValue] = useState("");
const [textValue, setTextValue] = useState("");
const [ratingValue, setRatingValue] = useState("");
const [productId, setProductId] = useState("");
const [reviewId, setReviewId] = useState("");

const apiUrl = 'http://localhost:3001/api/reviews';

const handleApiCall = async (method: string, urlExtension = '', bodyData: { 
        author: string, 
        text: string,
        rating: string,
        fk_product: string 
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

const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorValue(event.target.value); // Update the state in App with the value from MyComponent
};

const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value); 
};
const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(event.target.value);  
};
const handleProductId = (event: ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value); 
};
const handleReviewId = (event: ChangeEvent<HTMLInputElement>) => {
    setReviewId(event.target.value); 
};

return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'column'}}>
        <button onClick={() => 
            handleApiCall('POST', '', { 
                author: authorValue, 
                text: textValue,
                rating: ratingValue,
                fk_product: productId 
            })
        }>
            Create a new review
        </button>
        <button onClick={() => handleApiCall('GET', `?page=${parseInt(reviewId)}`)}>Get multiple reviews</button>
        <button onClick={() => 
            handleApiCall('PUT', `${reviewId}`, { 
                author: authorValue, 
                text: textValue,
                rating: ratingValue,
                fk_product: productId 
            })
        }>
            Update review
        </button>
        <button onClick={() => handleApiCall('DELETE', `${reviewId}`)}>Delete review</button>
        <button onClick={() => handleApiCall('GET', `${reviewId}`)}>Get review</button>
        <button onClick={() => handleApiCall('GET', `product/${productId}?page=${reviewId}`)}>Get product reviews</button>
    </div>

        <Input
            type="text"
            label="author"
            value={authorValue}
            onChange={handleAuthorChange}
            placeholder="author"
        /> 
        <Input
            type="text"
            label="text"
            value={textValue}
            onChange={handleTextChange}
            placeholder="text"
            /> 
        <Input
            type="text"
            label="rating"
            value={ratingValue}
            onChange={handleRatingChange}
            placeholder="rating"
        /> 
        <Input
            type="text"
            label="product id"
            value={productId}
            onChange={handleProductId}
            placeholder="product id"
        /> 
        <Input
            type="text"
            label="review id"
            value={reviewId}
            onChange={handleReviewId}
            placeholder="review id"
        /> 
    </div>
);
}

export default ReviewButtons;
