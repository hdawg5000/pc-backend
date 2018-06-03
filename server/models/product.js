const mongoose = require('mongoose')

var Product = mongoose.model('Product', ({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    type: {
        type: String,
        required: true,
        minlength: 1
    },
    price: {
        type: String,
        required: true,
        minlength: 1
    },
    imageUrl: {
        type: String,
        required: true,
        minlength: 1
    }
}))

module.exports = {
    Product
}