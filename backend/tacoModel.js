const {Schema,model} = require("mongoose");

const ordenItemSchema = Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

const ordenSchema = Schema({
    customerName: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    products: [ordenItemSchema],
    createdAt: { type: Date, default: Date.now }
})

const orden = model('Orden',ordenSchema);

module.exports = orden;