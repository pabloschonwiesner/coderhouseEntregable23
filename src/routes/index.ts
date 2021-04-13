import { Router } from 'express'
import { producto } from '../index'
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




export default router