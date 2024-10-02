const Product = require("../models/product");

class ProductRepository {
  async createProduct(productData) {
    return await Product.create(productData);
  }

  async getAllProducts() {
    return await Product.findAll();
  }

  async getProductById(id) {
    return await Product.findByPk(id);
  }

  async updateProduct(id, productData) {
    return await Product.update(productData, { where: { id } });
  }

  async deleteProduct(id) {
    return await Product.destroy({ where: { id } });
  }
}

module.exports = new ProductRepository();
