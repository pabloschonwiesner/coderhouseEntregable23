"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("../index");
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var app = express_1.default();
app.engine('hbs', express_handlebars_1.default({ extname: '.hbs', defaultLayout: 'index.hbs', layoutsDir: __dirname + '/layouts', partialsDir: __dirname + '/partials' }));
app.set('view engine', 'hbs');
app.set('views', __dirname);
var imagenes = [
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png", label: 'Calculadora' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-512.png", label: 'Paleta colores' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png", label: 'Globo terráqueo' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png", label: 'Reloj' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-512.png", label: 'Pizarrón' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png", label: 'Cuaderno' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/tube-lab-science-school-512.png", label: 'Tubo ensayo' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/graduation-square-academic-cap-school-512.png", label: 'Sombrero egresado' },
    { path: "https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png", label: 'Mochila' },
];
app.get('/', function (req, res) {
    res.render('abmProductos', { productos: index_1.producto.getAll(), imagenes: imagenes, helpers: { selectedOption: function (value, options) {
                var items = '';
                imagenes.forEach(function (i) {
                    if (i.path == value) {
                        items = items + "<option value=\"" + i.path + "\" selected>" + i.label + "</option>";
                    }
                    else {
                        items = items + "<option value=\"" + i.path + "\">" + i.label + "</option>";
                    }
                });
                return items;
            }
        } });
});
// app.get('/productos/vista', (req, res) => {
//   res.render('productos', { productos: producto.getAll() })
// })
// app.get('/productos/nuevoProducto', (req, res) => {
//   res.render('nuevoProducto', {imagenes})
// })
// app.get('/productos/editarProducto/:id', (req, res) => {
//   res.render('editarProducto', { producto: producto.getOne(+req.params.id), imagenes,  helpers: { selectedOption: function (value: any, options: any) { 
//     let items = ''
//     imagenes.forEach( i => {
//       if(i.path == value) {
//         items = `${items}<option value="${i.path}" selected>${i.label}</option>`
//       } else {
//         items = `${items}<option value="${i.path}">${i.label}</option>`
//       }
//     })
//       return items
//     }
//   }})
// })
exports.default = app;
