var express = require('express')
var bodyParser = require('body-parser')
var compression = require('compression') // middlewear that compresses response to client, reducing load time
var helmet = require('helmet') // middlewaear that protects app from well known web vulnerabilities

var { mongoose } = require('./db/mongoose')
var { Listing } = require('./models/listing')
var { User } = require('./models/user')
var { Product } = require('./models/product')

const port = process.env.PORT || 3000

var app = express()
app.use(bodyParser.json()) // Middlewear
app.use(compression())
app.use(helmet())

app.get('/listings', (req, res) => {

})

app.get('/products/graphics_cards', (req, res) => {
    Product.find({ type: "graphics card" }).then((products) => {
        if (!products) {
            res.status(404).send({ error: 'No graphics cards found' })
        }
        res.status(200).send({ products })
    }, (error) => {
        res.status(400).send({ error: 'Unable to fetch products' })
    }).catch((error) => {
        res.status(400).send({ error: 'Unable to fetch products' })
    })
})

app.post('/products/graphics_cards', (req, res) => {
    if (req.body.type !== 'graphics card') {
        return res.status(400).send({ error: "Type must be 'graphics card'" })
    }
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        imageUrl: req.body.imageUrl
    })

    product.save().then((product) => {
        res.status(200).send({ product })
    }).catch((error) => res.status(400).send({ error }))
})

app.get('/products/motherboards', (req, res) => {
    Product.find({ type: 'motherboard' }).then((products) => {
        if (!products) {
            return res.status(404).send({ error: 'No motherboards found' })
        }

        res.status(200).send({ products })
    })
})

app.post('/products/motherboards', (req, res) => {
    if (req.body.type !== 'motherboard') {
        return res.status(400).send({ error: "Type must be 'motherboard'" })
    }
    let product = new Product({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        imageUrl: req.body.imageUrl
    })
    product.save().then((product) => {
        res.status(200).send({ product })
    }).catch((error) => res.status(400).send({ error }))
})

app.post('/products', (req, res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        imageUrl: req.body.imageUrl
    })

    product.save().then((product) => {
        res.status(200).send({ product })
    }).catch((error) => res.status(400).send(error))
})

app.post('/new/listing', (req, res) => {

    var listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location
    })

    listing.save().then((doc) => {
        res.status(200).send(doc)
    }, (error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log(`Started server on port ${port}`)
})

module.exports = {
    app
}