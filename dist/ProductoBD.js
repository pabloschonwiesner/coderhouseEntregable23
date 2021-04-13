"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Producto_1 = __importDefault(require("./Producto"));
var ProductoBD = /** @class */ (function () {
    function ProductoBD() {
        this.productos = [];
    }
    ProductoBD.prototype.getAll = function () {
        return this.productos;
    };
    ProductoBD.prototype.getOne = function (id) {
        var producto = this.productos.find(function (i) { return i.getId() == id; });
        if (!producto) {
            throw Error('Producto no encontrado');
        }
        return producto;
    };
    ProductoBD.prototype.add = function (producto) {
        var nuevoId = 1;
        if (this.productos.length > 0) {
            var ultimoProducto = this.productos[this.productos.length - 1];
            nuevoId = ultimoProducto.getId() + 1;
        }
        var nuevoProducto = new Producto_1.default(nuevoId, producto.title, producto.price, producto.thumbnail);
        this.productos.push(nuevoProducto);
        return this.productos[this.productos.length - 1];
    };
    ProductoBD.prototype.update = function (producto) {
        var updateProducto = new Producto_1.default(+producto.id, producto.title, +producto.price, producto.thumbnail);
        var index = this.productos.findIndex(function (i) { return i.getId() == updateProducto.getId(); });
        if (index < 0) {
            throw Error('No existe el producto a actualizar');
        }
        this.productos[index] = updateProducto;
        return updateProducto;
    };
    ProductoBD.prototype.delete = function (id) {
        var index = this.productos.findIndex(function (i) { return i.getId() == id; });
        if (index < 0) {
            throw Error('No existe el producto a eliminar');
        }
        var deleteProducto = this.productos.splice(index, 1);
        return deleteProducto;
    };
    return ProductoBD;
}());
exports.default = ProductoBD;
