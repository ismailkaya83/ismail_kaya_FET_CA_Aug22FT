var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var ToDoService= require("../services/ToDoService")
var toDoService = new ToDoService(db);
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
        const todos = await toDoService.getAll(req.userId);
        res.jsend.success({ todos });
    } catch (err) {
        res.jsend.error({ message: 'Failed to fetch todos' });
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
        const { name, CategoryId } = req.body;
        const todo = await toDoService.update(req.params.id, name, CategoryId, req.userId);
        res.jsend.success({ todo });
    } catch (err) {
        if (err.message === 'Todo not found') {
            res.status(404).jsend.fail({ message: 'Todo not found' });
        } else {
            res.jsend.error({ message: 'Failed to update todo' });
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
        const todo = await toDoService.delete(req.params.id, req.userId);
        res.jsend.success({ todo });
    } catch (err) {
        if (err.message === 'Todo not found') {
            res.status(404).jsend.fail({ message: 'Todo not found' });
        } else {
            res.jsend.error({ message: 'Failed to update todo' });
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
        const { name, CategoryId } = req.body;
        const todo = await toDoService.create(name, CategoryId, req.userId);
        res.jsend.success({ todo });
    } catch (err) {
        res.jsend.error({ message: 'Failed to create todo', error: err });
    }
});

module.exports = router;