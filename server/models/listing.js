var mongoose = require('mongoose')

var Listing = mongoose.model('Listing', {
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    location: {
        type: String,
        required: true,
        minlength: 1
    }
})

module.exports = { Listing }