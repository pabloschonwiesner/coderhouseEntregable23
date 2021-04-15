import { normalize, schema } from 'normalizr';
import { producto, mensaje, io} from './../index'

const userSchema = new schema.Entity('authors')

const messegesSchema = new schema.Entity('messages', {
  author: userSchema
})

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
    let mensajeAgregadoNormal = normalize(mensajeAgregado, messegesSchema)
    io.sockets.emit('message', mensajeAgregadoNormal)
  })

  async function emitirListaProductos() {
    let listaProductos = JSON.stringify(await producto.getAll())
    client.emit('productos', listaProductos)
  }

  async function emitirListaMensajes() {
    let mensajes = { mensajes: {}}
    mensajes.mensajes = await mensaje.getAll()
    console.log(mensajes.mensajes)
    let listaMensajesNormal = normalize(mensajes.mensajes, [messegesSchema])
    client.emit('todosLosMensajes', JSON.stringify(listaMensajesNormal))
  }

  emitirListaProductos()
  emitirListaMensajes()
})