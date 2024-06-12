const express = require('express')
const {showProducts, showProductById, showProductsAdmin, showProductByIdAdmin, createProduct, showNewProductForm, showEditProductForm, updateProduct, deleteProduct} = require('../controllers/productController')

const router = express.Router()

//public
router.get('/products', showProducts)
router.get('/products/:productId', showProductById)

//admin
router.get('/dashboard', showProductsAdmin)
router.get('/dashboard/:productId', showProductByIdAdmin)
router.post('/dashboard', createProduct)
router.get('/dashboard/new', showNewProductForm) //esta no funciona
router.get('/dashboard/:productId/edit', showEditProductForm)
router.put('/dashboard/:productId', updateProduct)
router.delete("/dashboard/:productId/delete", deleteProduct)

module.exports = router