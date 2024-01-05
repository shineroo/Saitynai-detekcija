import { Product, Review } from "../types/types";

export default function ProductReview(props: Review) {
    const { author, text, rating } = props;

    return <>
        <div className="review">
            {author} {rating} stars
            <br/>
            {text}
            <br/>
            ---------------
        </div>
    </>
}