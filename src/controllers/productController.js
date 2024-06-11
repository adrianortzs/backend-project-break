const Product = require('../models/Product')

function getProductCards(products) {
  let html = ''
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products/:productId${product._id}">Ver detalle</a>
      </div>
    `;
  }
  return html;
}

function getNavBar() {

}

const showProducts = async (req, res) => {
    const products = await Product.find()
    const productCards = getProductCards(products)
    const html = baseHtml + getNavBar() + productCards
    res.send(html)
}

const showProductById = async (req, res) => {
    const products = await Product.findById()
    const productCard = getProductCards(products)
    res.send(productCard)
}

const showNewProduct = async (req, res) => {
    const addForm = `<form action="/dashboard" method="POST">
        <label for="name">Nombre:</label><br>
        <input type="text" id="name" name="name" required><br>

        <label for="description">Descripción:</label><br>
        <textarea id="description" name="description"></textarea><br>

        <label for="image">Imagen (URL):</label><br>
        <input type="text" id="image" name="image" required><br>

        <label for="category">Categoría:</label><br>
        <select id="category" name="category" required>
            <option value="Camisetas">Camisetas</option>
            <option value="Sudaderas">Sudaderas</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Abrigos">Abrigos</option>
            <option value="Accesorios">Accesorios</option>
        </select><br>

        <label for="size">Tamaño:</label><br>
        <select id="size" name="size" required>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        </select><br>

        <label for="price">Precio:</label><br>
        <input type="number" id="price" name="price" required><br>

        <input type="submit" value="Crear Producto">
        </form>`
    res.send(addForm)
}

const showEditProduct = async (req, res) => {
    const editForm = `<form action="/dashboard" method="PUT">
        <label for="name">Nombre:</label><br>
        <input type="text" id="name" name="name" required><br>

        <label for="description">Descripción:</label><br>
        <textarea id="description" name="description"></textarea><br>

        <label for="image">Imagen (URL):</label><br>
        <input type="text" id="image" name="image" required><br>

        <label for="category">Categoría:</label><br>
        <select id="category" name="category" required>
            <option value="Camisetas">Camisetas</option>
            <option value="Sudaderas">Sudaderas</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Abrigos">Abrigos</option>
            <option value="Accesorios">Accesorios</option>
        </select><br>

        <label for="size">Tamaño:</label><br>
        <select id="size" name="size" required>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        </select><br>

        <label for="price">Precio:</label><br>
        <input type="number" id="price" name="price" required><br>

        <input type="submit" value="Editar Producto">
        </form>`
    res.send(editForm)
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).send(product).redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Could not create the product'})
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const name = req.body.name
        const description = req.body.description
        const image = req.body.image
        const category = req.body.category
        const size = req.body.size
        const price = req.body.price

        const product = await Product.findById(id)
        product.name = name
        product.description = description
        product.image = image
        product.category = category
        product.size = size
        product.price = price
        await product.save()

        res.status(200).redirect('/dashboard')
    } catch(error) {
        console.error(error)
        res.status(500).send({message: 'Could not edit the product'})
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

  