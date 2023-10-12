const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM reviews LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getProductReviews(page = 1, productId) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM reviews WHERE fk_product=${productId} LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM reviews WHERE id=${id}`
    );

    if (rows.length === 0) {        
        data = 'no review with this id'
    } else {
        data = rows;
    }

    return {data};
}

async function create(review) {
    const result = await db.query(
        `INSERT INTO reviews
        (author, text, rating, fk_product)
        VALUES
        ('${review.author}', '${review.text}', '${review.rating}', ${review.fk_product})`
    );

    let message = 'error creating review';

    if (result.affectedRows) {
        message = 'review created successfully';
    }

    return {message};
}

async function update(id, review) {
    const result = await db.query(
        `UPDATE reviews
        SET author='${review.author}', text='${review.text}', rating='${review.rating}', fk_product=${review.fk_product}
        WHERE id=${id}`
    )

    let message = 'error updating review';

    if (result.affectedRows) {
        message = 'review updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM reviews WHERE id=${id}`
    );
  
    let message = 'error deleting review';
  
    if (result.affectedRows) {
      message = 'review deleted successfully';
    }
  
    return {message};
  }

module.exports = {
    getMultiple,
    getProductReviews,
    get,
    create,
    update,
    remove
}