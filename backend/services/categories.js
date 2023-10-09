const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name FROM categories LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(category) {
    const result = await db.query(
        `INSERT INTO categories
        (name)
        VALUES
        ('${category.name}')`
    );

    let message = 'error creating category';

    if (result.affectedRows) {
        message = 'category created successfully';
    }

    return {message};
}

async function update(id, category) {
    const result = await db.query(
        `UPDATE categories
        SET name=${category.name}
        WHERE id=${id}`
    )

    let message = 'error updating category';

    if (result.affectedRows) {
        message = 'category updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM categories WHERE id=${id}`
    );
  
    let message = 'error in deleting category';
  
    if (result.affectedRows) {
      message = 'category deleted successfully';
    }
  
    return {message};
  }

module.exports = {
    getMultiple,
    create,
    update,
    remove
}