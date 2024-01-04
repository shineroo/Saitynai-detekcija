import { Category } from "../types/types";

export default function CategorySelect(props: Category) {
    const href = "/catalog/" + props.id;
    
    return <>
        <a href={href} className="category-select">{props.name}</a>
    </>
    
}