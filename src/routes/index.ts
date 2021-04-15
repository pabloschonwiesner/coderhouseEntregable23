import { Router } from 'express'
// import { producto } from '../index'
import { normalize, schema } from 'normalizr';
import { producto, mensaje, io} from './../index'


const userSchema = new schema.Entity('authors')

const messegesSchema = new schema.Entity('messages', {
  author: userSchema
})

const router = Router()

router.get('/productos/vista-test', (req, res) => {
  try {
    res.status(200).json(producto.getMocksProductos( Number(req.query.cant)  ))
  } catch (err) { return res.status(500).json( { error: err.message })}
})

router.get('/productos', async (req, res) => {
  try {
    res.status(200).json(await producto.getAll())
  } catch (err) { return res.status(500).json( { error: err.message })}
})

router.get('/productos/:id', async (req, res) => {
  try {
    res.status(200).json(await producto.getOne(+req.params.id))
  } catch (err) { return res.status(500).json( { error: err.message })}
})

router.post('/productos', async (req, res) => {
  try {    
    if(!req.body.title && req.body.title == '') {
      throw Error('Falta el titulo del producto')
    }

    res.status(200).json(await producto.add(req.body))
  } catch (err) { return res.status(500).json({ error: err.message || 'Error'})}
})

router.put('/productos/:id', async (req, res) => {
  try {
    res.status(200).json(await producto.update(req.body))
  } catch (err) { return res.status(500).json({ error: err.message || 'Error'})}
})

router.delete('/productos/:id', async (req, res) => {
  try {
    res.status(200).json(await producto.delete(+req.params.id))
  } catch (err) { return res.status(500).json({ error: err.message || 'Error'})}
})

router.get('/rutaMensajes', async ( req, res) => {
  try {
    let mensajes = { mensajes: {}}
    mensajes.mensajes = await mensaje.getAll()
    let listaMensajesNormal = normalize(mensajes.mensajes, [messegesSchema])
    res.status(200).json({mensajes: listaMensajesNormal })
  } catch ( err ) { return res.status(500).json({ err: err.message} || 'Error' )}
})




export default router