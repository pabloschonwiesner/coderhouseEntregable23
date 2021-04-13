"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.mensaje = exports.producto = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = __importDefault(require("./routes/index"));
var ProductoBD_1 = __importDefault(require("./ProductoBD"));
var MensajeBD_1 = __importDefault(require("./MensajeBD"));
var path = __importStar(require("path"));
exports.producto = new ProductoBD_1.default();
exports.mensaje = new MensajeBD_1.default();
dotenv_1.default.config();
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/views'));
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});
app.use('/api', index_1.default);
// server socket.io
var server = require('http').createServer(app);
exports.io = require('socket.io')(server);
require('./sockets/index');
server.listen(process.env.PORT, function () { return console.log("Escuchando en el puerto " + process.env.PORT); });
server.on('error', function (err) { console.log("Error de conexion: " + err); });
