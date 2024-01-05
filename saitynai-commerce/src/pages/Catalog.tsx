import { useEffect, useState } from 'react';
import ProductThumbnail from '../components/ProductThumbnail'
import { Category, Product } from '../types/types';
import CategorySelect from '../components/CategorySelect';


export default function Catalog(props: any) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
    const path = window.location.pathname.split("/")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (path[2] != null) {
                    const product_response = await fetch(`http://localhost:8080/api/categories/${path[2]}/products`);
                    if (!product_response.ok) {
                        throw new Error('response was not ok');
                    }
                    const product_data = await product_response.json();
                    setProducts(product_data.product_data);
                } else {
                    const product_response = await fetch('http://localhost:8080/api/products');
                    if (!product_response.ok) {
                        throw new Error('response was not ok');
                    }
                    const product_data = await product_response.json();
                    setProducts(product_data.data);
                }
                

                const category_response = await fetch('http://localhost:8080/api/categories');
                if (!category_response.ok) {
                    throw new Error('response was not ok');
                }
                const category_data = await category_response.json();
                setCategories(category_data.data);
            } catch (error) {
                console.error('catalog - error fetching products: ', error);
            }
        }
        fetchProducts();
    }, [])

    return <>
        <h1>This is my catalog smiles</h1>
        <div className='catalog'>
            <div className='category-list'>
                <a href="/catalog">All products</a>
                {categories.map((category) => (
                    <CategorySelect
                        id={category.id}
                        name={category.name}
                    />
                ))}
            </div>
            <div className='product-list'>
                {products.map((product) => (
                    <ProductThumbnail 
                        id={product.id} 
                        name={product.name} 
                        image={product.image}
                        description={product.description}
                        fk_category={product.fk_category}
                        price={product.price}                    
                    />
                ))}
            </div>
        </div>
        
    </>
}