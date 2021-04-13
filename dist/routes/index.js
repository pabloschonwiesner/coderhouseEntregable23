"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("../index");
var router = express_1.Router();
router.get('/productos', function (req, res) {
    try {
        res.status(200).json(index_1.producto.getAll());
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
router.get('/productos/:id', function (req, res) {
    try {
        res.status(200).json(index_1.producto.getOne(+req.params.id));
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
router.post('/productos', function (req, res) {
    try {
        console.log(req.body);
        if (!req.body.title && req.body.title == '') {
            throw Error('Falta el titulo del producto');
        }
        res.status(200).json(index_1.producto.add(req.body));
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'Error' });
    }
});
router.put('/productos/:id', function (req, res) {
    try {
        res.status(200).json(index_1.producto.update(req.body));
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'Error' });
    }
});
router.delete('/productos/:id', function (req, res) {
    try {
        res.status(200).json(index_1.producto.delete(+req.params.id));
    }
    catch (err) {
        return res.status(500).json({ error: err.message || 'Error' });
    }
});
exports.default = router;
