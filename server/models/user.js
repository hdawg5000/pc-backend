var mongoose = require('mongoose')

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    username: {
        type: String,
        required: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    listings: {

    }
})

module.exports = { User }