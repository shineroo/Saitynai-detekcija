import { Product } from "../types/types";

export default function ProductThumbnail(props: Product) {
    const { image, name, id, price } = props;
    const href = "/product/" + id;

    return <>
        <div className="product-thumbnail">
            <div>
                <center><img src={image} className="product-image"/></center>
            </div>
            <div>
                <b><p>{name}</p></b>
                <p>{price}$</p>
                <a href={href}>View Product</a>
            </div>
        </div>
    </>
}