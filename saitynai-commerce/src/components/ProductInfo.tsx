import { Product } from "../types/types";

export default function ProductInfo(props: Product) {
    const { image, name, id, description } = props;
    const href = "/product/" + id;

    return <>
        <div className="product-thumbnail">
            <p>{name}</p>
            <img src={image} width={270}/>
            <p>{description}</p>
        </div>
    </>
}