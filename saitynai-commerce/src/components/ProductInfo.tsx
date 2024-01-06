import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../types/types";
import { faCartArrowDown, faCoffee, faDollar } from "@fortawesome/free-solid-svg-icons";

export default function ProductInfo(props: Product) {
    const { image, name, id, description, price } = props;
    const href = "/product/" + id;

    return <>
        <div className="container product-info">
            
            <div>
                <img src={image} style={{maxWidth: "100%", objectFit: "contain"}}/>
            </div>
            <div className="product-info-description">
                <div>
                <h2>{name}</h2>
                <h5>{description}</h5>
                </div>
                <div>
                    <h4>{price}$</h4>
                    <button className="btn btn-primary" style={{marginRight: 10, width: 110}}>Add to Cart <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon></button>
                    <button className="btn btn-primary" style={{marginRight: 10, width: 90}}>Buy Now <FontAwesomeIcon icon={faDollar}></FontAwesomeIcon></button>
                </div>
                
            </div>
        </div>
        
    </>
}