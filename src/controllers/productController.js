const Product = require('../models/Product')
const { v4: uuidv4 } = require('uuid');

//public
const showProducts = async (req, res) => {
    const products = await Product.find()
    if (!products) {
        return res.status(404).send({message: "No products available"})
    }
    res.render('allProducts', {products})
}

const showProductById = async (req, res) => {
    const id = req.params.productId
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).send({ message: "Product not found" })}
    res.render('productDetail', {product})
}

const showFilteredProducts = async (req, res) => {

}

//admin
const showProductsAdmin = async (req, res) => {
    const products = await Product.find()
    if (!products) {
        return res.status(404).send({message: "No products available"})
    }
    res.render('allProductsAdmin', {products})
}

const showProductByIdAdmin = async (req, res) => {
    const id = req.params.productId
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).send({ message: "Product not found" })}
    res.render('productDetailAdmin', {product})
}

const showNewProductForm = async (req, res) => {
    res.render('newProductForm.pug')
}

const showEditProductForm = async (req, res) => {
    const id = req.params.productId
    const product = await Product.findById(id)
    res.render('editProductForm', {product})
}

const createProduct = async (req, res) => {
    try {
        const {name, description, image, category, size, price} = req.body
        if (!name || !description || !image || !category || !size || !price) {
            return res.status(400).send({message: "Complete everything"})
        }
        const id = uuidv4()
        const product = new Product({name, description, image, category, size, price, id})
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

module.exports = {showProducts, showProductById, showFilteredProducts, showProductsAdmin, showProductByIdAdmin, showNewProductForm, showEditProductForm, createProduct, updateProduct, deleteProduct}

  