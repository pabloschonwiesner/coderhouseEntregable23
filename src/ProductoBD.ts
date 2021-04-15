import faker from 'faker'
import Producto from './Producto'

faker.locale = 'es'

class ProductoBD {

  async getAll () {
    // return this.productos
    let prod = await Producto.find({})

    if(prod.length == 0) {
      console.log('no es array');
      
      return []
    }
    
    return prod;
  }

  async getOne ( id: number ) {
    return await Producto.findOne({ id })
    
  }

  async add ( producto: any ) {
    console.log(producto)
    let nuevoProducto = new Producto( { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    return await nuevoProducto.save() 
  }

  async update ( producto: any) {
    return await Producto.updateOne( { id: producto.id }, { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    
  }

  async delete ( id: number) {
    return await Producto.deleteOne( {id })
  }

  getMocksProductos ( cantidad: Number ) {
    let productos = []
    
    if(cantidad == 0) {
      throw Error('No hay productos')
    } 

    if(!cantidad) {
      cantidad = 10
    }

    for(let i = 0; i < cantidad; i++) {
      productos.push({
        id: i,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
      })
    } 
    return productos
  }

}


export default ProductoBD