const express = require('express');
const router = express.Router();
const categories = require('../services/categories');

// GET CATEGORIES
router.get('/', async function (req, res, next) {
    try {
        res.json(await categories.getMultiple(req.query.page));
    } catch (err) {
        console.error(`error getting categories `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
  try {
      res.json(await categories.get(req.params.id));
  } catch (err) {
      console.error(`error getting category `, err.message);
      next(err);
  }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await categories.create(req.body))
    } catch (err) {
        console.error(`error creating category`, err.message);
        next(err);
    }
})

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await categories.update(req.params.id, req.body));
    } catch (err) {
      console.error(`error updating category`, err.message);
      next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await categories.remove(req.params.id));
    } catch (err) {
      console.error(`error deleting category`, err.message);
      next(err);
    }
});

module.exports = router;