const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
})

userSchema.pre('save', async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    //hash the password with cost 12
    this.password = await bcrypt.hash(this.password, 12); //hash here is an async function, we also have hashSync;
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;