import faker from 'faker'
import Producto from './Producto'

faker.locale = 'es'

class ProductoBD {
  // private productos: Producto[];
  // constructor() {
  //   this.productos = []
  // }

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
    // let producto = this.productos.find( i => i.getId() == id)
    // if(!producto) {
    //   throw Error('Producto no encontrado')
    // }
    // return producto
    return await Producto.findOne({ id })
    
  }

  async add ( producto: any ) {
    // let nuevoId = 1

    // if(this.productos.length > 0) {
    //   let ultimoProducto = this.productos[this.productos.length -1]
    //   nuevoId = ultimoProducto.getId() +1
    // }

    // let nuevoProducto = new Producto( nuevoId, producto.title, producto.price, producto.thumbnail );
    // this.productos.push(nuevoProducto);
    // return this.productos[this.productos.length -1]
    console.log(producto)
    let nuevoProducto = new Producto( { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    return await nuevoProducto.save() 
  }

  async update ( producto: any) {
    // let updateProducto = new Producto(+producto.id, producto.title, +producto.price, producto.thumbnail)
    // let index = this.productos.findIndex( i => i.getId() == updateProducto.getId())

    // if(index < 0) {
    //   throw Error('No existe el producto a actualizar')
    // }
    // this.productos[index] = updateProducto
    // return updateProducto

    return await Producto.updateOne( { id: producto.id }, { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    
  }

  async delete ( id: number) {
    // let index = this.productos.findIndex( i => i.getId() == id )
    
    // if(index < 0) {
    //   throw Error('No existe el producto a eliminar')
    // }

    // let deleteProducto = this.productos.splice(index, 1)
    // return deleteProducto
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