const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.get('/category/:cat_id/product/:prod_id', async function (req, res, next) {
    try {
        res.json(await products.getCategoryProduct(req.params.cat_id,req.params.prod_id));
    } catch (err) {
        console.error(`error getting products `, err.message);
        next(err);
    }
});

router.get('/category/:id', async function (req, res, next) {
  try {
      res.json(await products.getCategoryProducts(req.query.page, req.params.id));
  } catch (err) {
      console.error(`error getting category products `, err.message);
      next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
      res.json(await products.get(req.params.id));
  } catch (err) {
      console.error(`error getting product `, err.message);
      next(err);
  }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await products.create(req.body))
    } catch (err) {
        console.error(`error creating product `, err.message);
        next(err);
    }
})

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await products.update(req.params.id, req.body));
    } catch (err) {
      console.error(`error updating product `, err.message);
      next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await products.remove(req.params.id));
    } catch (err) {
      console.error(`error deleting product `, err.message);
      next(err);
    }
});

module.exports = router;