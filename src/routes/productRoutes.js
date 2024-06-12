const express = require('express')
const { showProducts, showProductById, showNewProduct, deleteProduct, updateProduct, createProduct, showEditProduct } = require('../controllers/productController')

const router = express.Router()

//public
router.get('/products', showProducts)
router.get('/products/:productId', showProductById)

//admin
router.get('/dashboard', showProducts)
router.get('/dashboard/:productId', showProductById)
router.get('/dashboard/new', showNewProduct)
router.get('/dashboard/:productId/edit', showEditProduct)
router.post('/dashboard', createProduct)
router.put('/dashboard/:productId', updateProduct)
router.delete("/dashboard/:productId/delete", deleteProduct)

module.exports = router