import mongoose from 'mongoose'


let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
  email: String,
  fechaHora: String,
  mensaje: String
})

export default mongoose.model('Mensaje', mensajeSchema)