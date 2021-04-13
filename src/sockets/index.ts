import { producto, mensaje, io} from './../index'

io.on('connection', (client: any) => {
  console.log('cliente conectado')
  io.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  client.on('agregarProducto', async (data: any) => {
    let productoAgregado = await producto.add(JSON.parse(data))
    io.sockets.emit('productoAgregado', JSON.stringify(productoAgregado))
    
  })

  client.on('message', async (data: any) => {
    let mensajeAgregado = await mensaje.add(data)
    io.sockets.emit('message', mensajeAgregado)
  })

  async function emitirListaProductos() {
    let listaProductos = JSON.stringify(await producto.getAll())
    client.emit('productos', listaProductos)
  }

  emitirListaProductos()
})