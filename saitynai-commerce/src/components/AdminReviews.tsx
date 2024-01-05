import { useEffect, useState } from "react";
import { Review } from "../types/types";
import AdminReview from "./AdminReview";

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState("")
    
    const path = window.location.pathname.split("/")
    const apiUrl = 'http://localhost:8080/api/reviews';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/reviews');
                if (!response.ok) {
                    throw new Error('response was not ok');
                }
                const data = await response.json();
                setReviews(data.data);
            } catch (error) {
                console.error('catalog - error fetching products: ', error);
            }
        }
        fetchProducts();
    }, [])

    
    return <>
        <h1>Categories</h1>
        <table className="admin-table table">
            <tr>
                <th>id</th>
                <th>author</th>
                <th>text</th>
                <th>rating</th>
                <th>#</th>
            </tr>            
            {reviews.map((review) => (
                    <AdminReview
                        id={review.id}
                        author={review.author}
                        text={review.text}
                        rating={review.rating}
                    />
                ))}
        </table>
    </>
}