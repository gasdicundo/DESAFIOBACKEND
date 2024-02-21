const ProductModel = require('./models/products.model');

class ProductManagerDb {

  async getProductByID(id) {
    try {
      const product = await ProductModel.findOne({ _id: id });
      if (product) return product;
      console.log('Producto no encontrado');
    } catch (error) {
      console.error('Error al buscar producto por ID:', error.message);
    }
  }

  async addProduct(product) {
    try {
      const { title, description, price, thumbnail, code, stock, category } = product;

      if (!title || !description || !price || !code || !stock || !category) {
        console.error('Todos los campos son obligatorios. Producto no agregado.');
        return { success: false, message: 'Todos los campos son obligatorios. Producto no agregado.' };
      }

      const codeExist = await ProductModel.findOne({ code });
      if (codeExist) {
        console.error(`El producto con código: ${code} ya existe. Por favor, seleccione otro.`);
        return { success: false, message: `El producto con código: ${code} ya existe. Por favor, seleccione otro.` };
      }

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true,
        category
      };

      await ProductModel.create(newProduct);

      return { success: true };

    } catch (error) {
      console.error('Error al agregar producto:', error.message);
      return { success: false, message: 'Error interno al procesar la solicitud.' };
    }
  }

  async updateProduct(productUpdated) {
    try {
      const { id } = productUpdated;
      if (!id) {
        console.error('ID del producto no proporcionado.');
        return;
      }

      const result = await ProductModel.findOneAndUpdate({ _id: id }, productUpdated);
      if (!result) {
        console.error(`Producto no encontrado con ID: ${id}`);
        return;
      }

      console.log(`Producto actualizado correctamente con ID: ${id}`);

    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const result = await ProductModel.updateOne({ _id: id }, { status: false });
      if (result.nModified > 0) {
        console.log(`Producto borrado correctamente con ID: ${id}`);
        return true;
      }
      console.error(`No se encontró el producto con ID: ${id}`);
      return false;
    } catch (error) {
      console.error('Error al borrar el producto:', error.message);
      return false;
    }
  }
}

module.exports = ProductManagerDb;



