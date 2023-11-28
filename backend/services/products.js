const db = require('./db');
const helper = require('../helper');
const config = require('../config');

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
    const rows = await db.query(
        `SELECT * FROM products WHERE fk_category=${categoryId} LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function get(id) {
    const rows = await db.query(
        `SELECT * FROM products WHERE id=${id}`
    );

    if (rows.length === 0) {        
        data = 'no product with this id'
    } else {
        data = rows;
    }

    return {data};
}

async function create(product) {
    const result = await db.query(
        `INSERT INTO products
        (name, image, description, fk_category)
        VALUES
        ('${product.name}', '${product.image}', '${product.description}', ${product.fk_category})`
    );

    let message = 'error creating product';

    if (result.affectedRows) {
        message = 'product created successfully';
    }

    return {message};
}

async function update(id, product) {
    const result = await db.query(
        `UPDATE products
        SET name='${product.name}', image='${product.image}', description='${product.description}', fk_category=${product.fk_category}
        WHERE id=${id}`
    )

    let message = 'error updating product';

    if (result.affectedRows) {
        message = 'product updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM products WHERE id=${id}`
    );
  
    let message = 'error in deleting product';
  
    if (result.affectedRows) {
      message = 'product deleted successfully';
    }
  
    return {message};
  }

module.exports = {
    getCategoryProduct,
    getCategoryProducts,
    get,
    create,
    update,
    remove
}