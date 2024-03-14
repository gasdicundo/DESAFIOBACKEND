const ProductDao = require('../DAO/product-dao.mongo')

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao()
    }

    async getProductByID(id) {
        try {
            return await this.productDao.getProductByID(id)
        } catch (error) {
            throw error
        }
    }

    async addProduct(product) {
        try {
            return await this.productDao.addProduct(product)
        } catch (error) {
            throw error
        }
    }

    async updateProduct(productUpdated) {
        try {
            await this.productDao.updateProduct(productUpdated)
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(pid) {
        try {
            return await this.productDao.deleteProduct(pid)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductRepository
