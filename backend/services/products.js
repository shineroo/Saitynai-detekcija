const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getProducts(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM products LIMIT ${offset},${config.listPerPage}`
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
    getProducts,
    get,
    create,
    update,
    remove
}