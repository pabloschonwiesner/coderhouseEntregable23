"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../index");
index_1.io.on('connection', function (client) {
    console.log('cliente conectado');
    index_1.io.on('disconnect', function () {
        console.log('cliente desconectado');
    });
    client.on('agregarProducto', function (data) {
        var productoAgregado = index_1.producto.add(JSON.parse(data));
        index_1.io.sockets.emit('productoAgregado', JSON.stringify(productoAgregado));
    });
    client.on('message', function (data) {
        var mensajeAgregado = index_1.mensaje.add(data);
        index_1.io.sockets.emit('message', mensajeAgregado);
    });
    function emitirListaProductos() {
        var listaProductos = JSON.stringify(index_1.producto.getAll());
        client.emit('productos', listaProductos);
    }
    emitirListaProductos();
});
