import { Product } from "../types/types";

export default function ProductInfo(props: Product) {
    const { image, name, id, description } = props;
    const href = "/product/" + id;

    return <>
        <div className="product-thumbnail">
            <p>{name}</p>
            <p>{image}</p>
            <p>{description}</p>
        </div>
    </>
}