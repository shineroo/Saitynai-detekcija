const express = require('express');
const router = express.Router();
const products = require('../services/products');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');
const { RequestError } = require('request-promise/errors');
const { AuthorizationError } = require('../helper');

router.get('/', async function (req, res, next) {
  try {
    var page;
    if (req.query.page === undefined) {
      page = 1
    } else {
      page = req.query.page;
    }

    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM products LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    
    const allRows = await db.query(
        `SELECT * FROM products`
    )
    const product_count = allRows.length;
    const meta = {page, product_count};


    return res.status(200).json({data, meta});
  } catch (err) {
      console.error(`error getting category products `, err.message);
      next(err);
      return res.status(500).json("internal server error");
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const rows = await db.query(
      `SELECT * FROM products WHERE id=${req.params.id}`
    );

    if (rows.length === 0) {        
      return res.status(404).json('no product with this id');
    } else {
      data = rows;
      return res.json({data});
    }

} catch (err) {
    console.error(`error getting category `, err.message);
    next(err);
    return res.status(500).json('internal server error');
}
});

router.get('/:id/reviews', async function (req, res, next) {
  try {
      return res.json(await products.getReviews(req.params.id, req.query.page));
  } catch (err) {
      console.error(`error getting product `, err.message);
      next(err);
      return res.status(500).json("internal server error");
  }
});

router.post('/', async function (req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      if (req.body.name === undefined
          || req.body.description === undefined
          || req.body.image === undefined
          || req.body.fk_category === undefined
          || isNaN(req.body.fk_category)
          || req.body.price === undefined
          || isNaN(req.body.price)) {
        throw new RequestError('Incorrect request structure')
      }
      console.log(`INSERT INTO products
      (name, image, description, fk_category, price)
      VALUES
      ('${req.body.name}', '${req.body.image}', '${req.body.description}', ${req.body.fk_category}, ${req.body.price})`)
      const result = await db.query(
        `INSERT INTO products
        (name, image, description, fk_category, price)
        VALUES
        ('${req.body.name}', '${req.body.image}', '${req.body.description}', ${req.body.fk_category}, ${req.body.price})`
      );
      let message = 'error creating product';

      if (result.affectedRows) {
          message = 'product created successfully';
          return res.status(201).json(message);
      } else {
        return res.status(500).json(message);
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }      
  } catch (err) {

    switch (true) {
      case err instanceof RequestError:
        console.error(`error creating category`, err.message);
        return res.status(400).json("Incorrect request structure.");
        break;
      
      case err instanceof AuthorizationError:
        return res.status(401).json("Not authorized.");
        break;
      
      default:
        console.error(`error creating category`, err.message);
        next(err);
        return res.status(500).json('internal server error');
        break;
    }
  }
})

router.put('/:id', async function(req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      if (req.body.name === undefined
          || req.body.description === undefined
          || req.body.image === undefined
          || req.body.fk_category === undefined
          || isNaN(req.body.fk_category)
          || req.body.price === undefined
          || isNaN(req.body.price)) {
        throw new RequestError('Incorrect request structure')
      }

      const result = await db.query(
        `UPDATE products
        SET name='${req.body.name}', image='${req.body.image}', description='${req.body.description}', fk_category=${req.body.fk_category}, price=${req.body.price}
        WHERE id=${req.params.id}`
      );

      let message = 'error creating products';

      if (result.affectedRows) {
          message = 'products updated successfully';
          return res.status(200).json(message);
      } else {
        return res.status(404).json("no products with this id");
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }      
  } catch (err) {
    // this should really be a switch
    if (err instanceof RequestError) {
      console.error(`error creating products`, err.message);
      return res.status(400).json("Incorrect request structure.");
    } else if (err instanceof AuthorizationError) {
      return res.status(401).json("Not authorized.");
    } else {
      console.error(`error creating products`, err.message);
      next(err);
      return res.status(500).json('internal server error'); 
    }
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      const result = await db.query(
        `DELETE FROM products WHERE id=${req.params.id}`
      );

      if (result.affectedRows) {        
        return res.status(200).json('product deleted successfully');
      } else {
        return res.status(404).json('no products with this id');
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }

  } catch (err) {
      switch (true) {
        case err instanceof RequestError:
          console.error(`error creating product`, err.message);
          return res.status(400).json("Incorrect request structure.");
          break;
        
        case err instanceof AuthorizationError:
          return res.status(401).json("Not authorized.");
          break;
        
        default:
          console.error(`error creating category`, err.message);
          next(err);
          return res.status(500).json('internal server error');
          break;
      }
  }
});

module.exports = router;