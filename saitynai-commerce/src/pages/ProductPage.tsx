import { useEffect, useState } from 'react';
import { Product, Category, Review } from '../types/types';
import ProductInfo from '../components/ProductInfo';
import ProductReview from '../components/ProductReview';
import ReviewWrite from '../components/ReviewWrite';
import { Container, Row } from 'reactstrap';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function ProductPage(props: any) {
    const [products, setProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/' + props.product_id);
                if (!response.ok) {
                    throw new Error('product - response was not ok');
                }
                const product_data = await response.json();
                setProducts(product_data.data);
                
            } catch (error) {
                console.error('catalog - error fetching products: ', error);
            }
        }

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${props.product_id}/reviews`)
                if (!response.ok) {
                    throw new Error('reviews - response was not ok');
                }
                const review_data = await response.json();
                setReviews(review_data.data);                
            } catch (error) {
                console.error('catalog - error fetching reviews: ', error);
            }
        }
        fetchProducts();
        fetchReviews();
    }, [])

    function reviewAverage() {
        var total = 0;
        const reviewCount = reviews.length
        reviews.forEach((review) => {
            total += review.rating;
        });
        return total / reviewCount;
    }

    return <>
        <Container>
            {products.map((product) => (
                <ProductInfo 
                    id={product.id} 
                    name={product.name} 
                    image={product.image}
                    description={product.description}
                    fk_category={product.fk_category}
                    price={product.price}                    
                />
            ))}
            <h3>Reviews</h3>
            {reviews.length != 0 &&
                <>
                    <FontAwesomeIcon icon={faStar} color='#edc939'/> {reviewAverage()} Average
                </>
            }
            <div className="review-panel">
                {reviews.map((review) => (
                    <ProductReview
                        id = {420}
                        author = {review.author}
                        text = {review.text}
                        rating = {review.rating}
                    />
                ))}
            </div>
            
            {localStorage['role'] != null &&
                <>
                    {products.map((product) => (
                        <ReviewWrite />
                    ))}            
                </>
                
            }
        </Container>
    </>
}0