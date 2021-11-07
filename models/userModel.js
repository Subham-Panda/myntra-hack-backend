const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true,
        min: 1111111111,
        max: 9999999999
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