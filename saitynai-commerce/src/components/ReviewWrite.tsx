import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function ReviewWrite() {
    const [text, setText] = useState("")
    const [stars, setStars] = useState(5)
    const [error, setError] = useState("")

    const path = window.location.pathname.split("/")

    async function SubmitReview() {
        const response = await fetch('http://localhost:8080/api/reviews', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['token']}`
            },
            body: JSON.stringify({
                'author': localStorage['name'],
                'rating': stars,
                'text': text,
                'fk_product': parseInt(path[2]) 
            })
        });
        if (!response.ok) {
            console.log("response not ok");
            throw new Error('response was not ok');
        }
        window.location.reload()
    }

    return <>
    <hr/>
        <div className="review-write">
            <h3>Write a review</h3>
            <textarea value={text} onChange={ev => setText(ev.target.value)} className="form-control" placeholder="Say something about this product..."></textarea>
            <div className="stars">
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ cursor: "pointer", color: stars <= 0 ? 'inherit' : '#edc939' }}
                    onClick={() => setStars(1)}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ cursor: "pointer", color: stars <= 1 ? 'inherit' : '#edc939' }}
                    onClick={() => setStars(2)}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ cursor: "pointer", color: stars <= 2 ? 'inherit' : '#edc939' }}
                    onClick={() => setStars(3)}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ cursor: "pointer", color: stars <= 3 ? 'inherit' : '#edc939' }}
                    onClick={() => setStars(4)}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ cursor: "pointer", color: stars <= 4 ? 'inherit' : '#edc939' }}
                    onClick={() => setStars(5)}
                />
            </div>
            <button className="btn btn-primary" onClick={SubmitReview}>Submit review</button>
            {error}
        </div>
    </>
}