const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sub_heading: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    review: {
        type: Number,
        required: true
    },
    dis_price: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    sizes: [{
        type: String,
        required: true
    }],
    product_details: {
        type: String,
        required: true
    },
    feature: [{
        type: String,
        required: true
    }],
    size_and_fit: [{
        type: String,
        required: true
    }],
    material_and_care: [{
        type: String,
        required: true
    }],
    specification: {
        fabric: {
            type: String,
            required: true
        },
        fit: {
            type: String,
            required: true
        },
        length: {
            type: String,
            required: true
        },
        main_trend: {
            type: String,
            required: true
        },
        Multipack_set: {
            type: String,
            required: true
        },
        Neck: {
            type: String,
            required: true
        },
        Ocassion: {
            type: String,
            required: true
        },
        pattern: {
            type: String,
            required: true
        },
        print_or_pattern_type: {
            type: String,
            required: true
        },
        sleeve_length: {
            type: String,
            required: true
        },
        sleeve_styling: {
            type: String,
            required: true
        },
        sport: {
            type: String,
            required: true
        },
        sustainable: {
            type: String,
            required: true
        },
        technology: {
            type: String,
            required: true
        },
        wash_care: {
            type: String,
            required: true
        },
        weave_type: {
            type: String,
            required: true
        },
        complete_the_look: {
            type: String,
            required: true
        },
    },
    type: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    quantity: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    rating: {
       type: String
    },
    selected_size: {
        type: String
    },
    isdot: {
        type: Boolean,
    },
    isdotvalue: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;