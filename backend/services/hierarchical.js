const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCategory(category_id) {
    const rows = await db.query(
        `SELECT * FROM categories WHERE id=${category_id}`
    );

    if (rows.length === 0) {        
        data = 'no category with this id'
        return {data};
    } 
    data = rows
    return data
}

async function getCategoryProduct(category_id, product_id) {
    const rows = await db.query(
        `SELECT * FROM categories WHERE id=${category_id}`
    );

    if (rows.length === 0) {        
        data = 'no category with this id'
        return {data};
    } 

    const newrows = await db.query(
        `SELECT * FROM products WHERE id=${product_id} and fk_category=${category_id}`
    );
    
    if (rows.length === 0) {        
        data = 'no product with this id'
        return {data};
    } 
    data = newrows
    
    return data
}

async function getCategoryProductReview(category_id, product_id, review_id) {
    const rows = await db.query(
        `SELECT * FROM categories WHERE id=${category_id}`
    );

    if (rows.length === 0) {        
        data = 'no category with this id'
        return {data};
    } 

    const newrows = await db.query(
        `SELECT * FROM products WHERE id=${product_id} and fk_category=${category_id}`
    );
    
    if (rows.length === 0) {        
        data = 'no product with this id'
        return {data};
    } 
    const newnewrows = await db.query(
        `SELECT * FROM reviews WHERE id=${review_id} and fk_product=${product_id}`
    );
    
    data = newnewrows
    
    return data
}

module.exports = {
    getCategory,
    getCategoryProduct,
    getCategoryProductReview
}