const express = require('express');
const router = express.Router();
const hierarchical = require('../services/hierarchical');

router.get('/:cat_id/', async function (req, res, next) {
    try {
        res.json(await hierarchical.getCategory(req.params.cat_id));
    } catch (err) {
        console.error(`error getting products `, err.message);
        next(err);
    }
});

router.get('/:cat_id/product/:prod_id', async function (req, res, next) {
    try {
        res.json(await hierarchical.getCategoryProduct(req.params.cat_id, req.params.prod_id));
    } catch (err) {
        console.error(`error getting products `, err.message);
        next(err);
    }
});

router.get('/:cat_id/product/:prod_id/review/:rev_id', async function (req, res, next) {
    try {
        res.json(await hierarchical.getCategoryProductReview(req.params.cat_id, req.params.prod_id, req.params.rev_id));
    } catch (err) {
        console.error(`error getting products `, err.message);
        next(err);
    }
});

module.exports = router;