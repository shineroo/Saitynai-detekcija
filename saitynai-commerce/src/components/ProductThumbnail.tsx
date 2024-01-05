import { Product } from "../types/types";

export default function ProductThumbnail(props: Product) {
    const { image, name, id } = props;
    const href = "/product/" + id;

    return <>
        <div className="product-thumbnail">
            <p>{name}</p>
            <img src={image} width={270}/>
            <a href={href}>BUY NOW!</a>
        </div>
    </>
}