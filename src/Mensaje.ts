import mongoose from 'mongoose'


let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
  author: {
    email: String,
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String
  },
  text: String
})

export default mongoose.model('Mensajes', mensajeSchema)