import { useEffect, useState } from 'react';
import { Product, Category } from '../types/types';
import ProductInfo from '../components/ProductInfo';

export default function ProductPage(props: any) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryInfo, setCategoryInfo] = useState<Category>();
    
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
        fetchProducts();
    }, [])

    return <>
        {products.map((product) => (
            <ProductInfo 
                id={product.id} 
                name={product.name} 
                image={product.image}
                description={product.description}
                category_id={product.category_id}                    
            />
        ))}
        
    </>
}