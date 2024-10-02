const express = require("express");
const router = express.Router();
const productRepository = require("../repository/productRepository");
const ProductDto = require("../common/dto/productDto");

class ProductController {
  async createProduct(req, res) {
    const productDto = new ProductDto(req.body);
    const product = await productRepository.createProduct(productDto);
    res.status(201).json(product);
  }

  async getAllProducts(req, res) {
    const products = await productRepository.getAllProducts();
    res.status(200).json(products);
  }
}

const productController = new ProductController();

// Define routes here
router.post("/", (req, res) => productController.createProduct(req, res));
router.get("/", (req, res) => productController.getAllProducts(req, res));

module.exports = router;
