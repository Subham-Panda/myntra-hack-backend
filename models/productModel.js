const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    sub_heading: {
        type: String,
    },
    color: {
        type: String,
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    review: {
        type: Number,
    },
    dis_price: {
        type: Number,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    sizes: [{
        type: String,
    }],
    product_details: {
        type: String,
    },
    feature: [{
        type: String,
    }],
    size_and_fit: [{
        type: String,
    }],
    material_and_care: [{
        type: String,
    }],
    specification: {
        fabric: {
            type: String,
        },
        fit: {
            type: String,
        },
        length: {
            type: String,
        },
        main_trend: {
            type: String,
        },
        Multipack_set: {
            type: String,
        },
        Neck: {
            type: String,
        },
        Ocassion: {
            type: String,
        },
        pattern: {
            type: String,
        },
        print_or_pattern_type: {
            type: String,
        },
        sleeve_length: {
            type: String,
        },
        sleeve_styling: {
            type: String,
        },
        sport: {
            type: String,
        },
        sustainable: {
            type: String,
        },
        technology: {
            type: String,
        },
        wash_care: {
            type: String,
        },
        weave_type: {
            type: String,
        },
        complete_the_look: {
            type: String,
        },
    },
    type: {
        type: String,
    },
    images: [{
        type: String,
    }],
    quantity: {
        type: Number,
    },
    gender: {
        type: String,
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

    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;