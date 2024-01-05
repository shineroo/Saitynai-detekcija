import { useState } from "react"

export default function ReviewWrite() {
    const [text, setText] = useState("")
    const [stars, setStars] = useState("")
    const [error, setError] = useState("")

    const path = window.location.pathname.split("/")

    async function SubmitReview() {
        const response = await fetch('http://localhost:8080/api/reviews', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
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
        <div className="review-write">
            <input value={text} onChange={ev => setText(ev.target.value)}></input>
            <input value={stars} onChange={ev => setStars(ev.target.value)}></input>
            <button className="btn btn-primary" onClick={SubmitReview}>Submit review</button>
            {error}
        </div>
    </>
}