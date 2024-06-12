const Product = require('../models/Product')

const showProducts = async (req, res) => {
    const products = await Product.find()
    res.render('allProducts', {products})
}

const showProductById = async (req, res) => {
    const id = req.params.productId
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).send({ message: "Product not found" })}
    res.render('productDetail', {product})
}

const showNewProduct = async (req, res) => {
    res.render('newProduct')
}

const showEditProduct = async (req, res) => {
    res.render('editProduct')
}

const createProduct = async (req, res) => {
    try {
        const {name, description, image, category, size, price} = req.body
        const product = new Product({name, description, image, category, size, price})
        await product.save()
        res.status(201).redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Could not create the product'})
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        if (!product) {
            return res.status(404).send({ message: "Product not found" })}
        res.status(200).redirect(`/dashboard/${id}`)
    } catch(error) {
        console.error(error)
        res.status(500).send({message: 'Could not update the product'})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).send({ message: "Product not found" })}
        res.status(200).redirect('/dashboard')
    } catch(error) {
        console.error(error)
        res.status(500).send({ message: "Could not delete the product" })
    }
}

module.exports = {showProducts, showProductById, showNewProduct, showEditProduct, createProduct, updateProduct, deleteProduct}

  