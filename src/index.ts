import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index'
import ProductoBD from './ProductoBD'
import MensajeBD from './MensajeBD'
import * as path from 'path';

import mongoose from 'mongoose'


export let producto = new ProductoBD()
export let mensaje = new MensajeBD()

dotenv.config() 
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'))
})


app.use('/api', routes)

// server socket.io
const server = require('http').createServer(app);
export const io = require('socket.io')(server);
require('./sockets/index')

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true}, (err: any) => {
  if(err) throw err;
  
  console.log('Base de datos ONLINE');
});

server.listen( process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}`))

server.on('error', (err: any) => { console.log(`Error de conexion: ${err}`)})

