import { useEffect, useState } from 'react';
import ProductThumbnail from '../components/ProductThumbnail'
import { Category, Product } from '../types/types';
import CategorySelect from '../components/CategorySelect';
import { Col, Container, Row } from 'react-bootstrap';


export default function Catalog(props: any) {
    var state = {
        currentPage: 1
    };
    const [page, setPage] = useState(1);
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
    const path = window.location.pathname.split("/")

    function extractPageFromURL() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('page');
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const categoryPath = path[2];
                const apiUrl = categoryPath ? `http://localhost:8080/api/categories/${categoryPath}/products?page=${page}` : `http://localhost:8080/api/products?page=${page}`;

                try {
                const product_response = await fetch(apiUrl);
                if (!product_response.ok) {
                    throw new Error('response was not ok');
                }
                const product_data = await product_response.json();

                const productsData = categoryPath ? product_data.product_data : product_data.data;
                setProducts(productsData);
                setProductCount(product_data.meta.product_count);
                } catch (error) {
                console.error('catalog - error fetching products: ', error);
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
        var currentPage = extractPageFromURL();
        if (currentPage != null) {
            setPage(parseInt(currentPage));
        }
        fetchProducts();
    }, [page])

    const totalPages = Math.ceil(productCount / 12); 
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const loopWithCurlyBraces = pageNumbers.map((pageNumber) => {        
        return <li className='page-item'><a href={window.location.pathname + `?page=${pageNumber}`} className='page-link'>{pageNumber}</a></li>;
    
    
    });

    return <>
        <center><h1>Catalog</h1></center>
        <Container>
            <Row style={{display: 'flex', justifyContent: 'center' }}>
                <Col xs={2} className='category-list'>
                    <h3>Categories</h3>
                    <a href="/catalog">All products</a>
                    {categories.map((category) => (
                        <CategorySelect
                            id={category.id}
                            name={category.name}
                        />
                    ))}
                </Col>
                <Col>
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
                </Col>
            </Row>
        </Container>

        <div className='catalog-pages'>
            <ul className="pagination">
                {loopWithCurlyBraces}
            </ul>
        </div>

    </>

/*
<ProductThumbnail 
    id={product.id} 
    name={product.name} 
    image={product.image}
    description={product.description}
    fk_category={product.fk_category}
    price={product.price}                    
/>

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
        <div className='catalog-pages'>
            {loopWithCurlyBraces}
        </div>
    </>
    */
}