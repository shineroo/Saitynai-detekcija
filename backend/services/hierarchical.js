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

async function getCategoryProducts(page = 1, categoryId) {
    const offset = helper.getOffset(page, config.listPerPage);
    const category_rows = await db.query(
        `SELECT * FROM categories where id=${categoryId} LIMIT 1`
    )
    const category_data = helper.emptyOrRows(category_rows);
    if (category_data.length === 0) {
        data = 'no category with this id';
        return {data};
    }

    const product_rows = await db.query(
        `SELECT * FROM products WHERE fk_category=${categoryId} LIMIT ${offset},${config.listPerPage}`
    );
    const product_data = helper.emptyOrRows(product_rows);
    const meta = {page};

    return {
        category_data,
        product_data,
        meta
    }
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
    getCategoryProducts,
    getCategoryProductReview
}