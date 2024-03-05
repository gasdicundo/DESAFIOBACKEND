const ProductModel = require('../DAO/models/products.model');

async function fetchProducts({ limit = 10, page = 1, sort, category, stock }) {
    const limitValue = limit ? parseInt(limit) : 10;

    const query = {
        $and: [
            { status: true },
            { category: category ? { $eq: category } : { $exists: true } },
            { stock: stock ? { $eq: stock } : { $exists: true } }
        ]
    };

    const options = {
        page,
        limit: limitValue,
        lean: true,
        sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : undefined
    };

    return await ProductModel.paginate(query, options);
}

module.exports = { fetchProducts };
