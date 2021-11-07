const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
    },
    email: {
        type: String,   
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    bag: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        selected_size: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    orders: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        selected_size: { type: String, required: true },
        quantity: { type: Number, required: true },
        order_date: { type: Date, default: Date.now }
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;