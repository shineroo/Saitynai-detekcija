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
      res.json(await programmingLanguages.update(req.params.id, req.body));
    } catch (err) {
      console.error(`error while updating category`, err.message);
      next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting programming language`, err.message);
      next(err);
    }
});

module.exports = router;