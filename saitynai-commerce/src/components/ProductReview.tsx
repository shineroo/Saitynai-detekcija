import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product, Review } from "../types/types";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ProductReview(props: Review) {
    const { author, text, rating } = props;

    return <>
        <div className="review">
            <hr/>
            <b>{author} </b>
            <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ color: rating <= 0 ? 'inherit' : '#edc939' }}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ color: rating <= 1 ? 'inherit' : '#edc939' }}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ color: rating <= 2 ? 'inherit' : '#edc939' }}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ color: rating <= 3 ? 'inherit' : '#edc939' }}
                />
                <FontAwesomeIcon 
                    icon={faStar} 
                    style={{ color: rating <= 4 ? 'inherit' : '#edc939' }}
                />
            <br/>
            {text}
            <br/>
            
        </div>
    </>
}