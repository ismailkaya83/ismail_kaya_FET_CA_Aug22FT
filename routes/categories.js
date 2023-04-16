var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var CategoryService = require("../services/CategoryService")
var categoryService = new CategoryService(db);
var jwt = require('jsonwebtoken')

router.use(jsend.middleware);

router.get('/', function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).jsend.fail({ message: 'Authentication required' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (err) {
        return res.status(401).jsend.fail({ message: 'Invalid token' });
    }
}, async function (req, res, next) {
    try {
        const categories = await categoryService.getAll();
        res.jsend.success({ categories });
    } catch (err) {
        res.jsend.error({ message: 'Failed to fetch categories' });
    }
});

router.put('/:id', function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).jsend.fail({ message: 'Authentication required' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (err) {
        return res.status(401).jsend.fail({ message: 'Invalid token' });
    }
}, async function (req, res, next) {
    try {
        const { name } = req.body;
        const category = await categoryService.update(req.params.id, name);
        res.jsend.success({ category });
    } catch (err) {
        if (err.message === 'Category not found') {
            res.status(404).jsend.fail({ message: 'Category not found' });
        } else {
            res.status(400).jsend.error({ message: 'Failed to update category' });
        }
    }
});

router.delete('/:id', function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).jsend.fail({ message: 'Authentication required' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (err) {
        return res.status(401).jsend.fail({ message: 'Invalid token' });
    }
}, async function (req, res, next) {
    try {
        const category = await categoryService.delete(req.params.id);
        res.jsend.success({ category });
    } catch (err) {
        if (err.message === 'Category not found') {
            res.status(404).jsend.fail({ message: 'Category not found' });
        } else {
            res.status(400).jsend.error({ message: 'Failed to delete category' });
        }
    }
});

router.post('/', function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).jsend.fail({ message: 'Authentication required' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (err) {
        return res.status(401).jsend.fail({ message: 'Invalid token' });
    }
}, async function (req, res, next) {
    try {
        const { name } = req.body;
        const category = await categoryService.create(name);
        res.jsend.success({ category });
    } catch (err) {
        res.status(400).jsend.error({ message: 'Failed to create category' });
    }
});

module.exports = router;

