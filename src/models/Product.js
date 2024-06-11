const mongoose = require('mongoose')

// trim elimina los espacios en blanco sobrantes
const productSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    description: {type: String, trim: true},
    image: {type: String, trim: true, required: true},
    category: {type: String, trim: true, required: true, enum: ['Camisetas','Sudaderas','Pantalones','Zapatillas','Abrigos','Accesorios']},
    size: {type: String, trim: true, required: true, enum: ['XS','S','M','L','XL']},
    price: {type: Number, trim: true, required: true}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product