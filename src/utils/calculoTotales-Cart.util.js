const calculateSubtotalAndTotal = (products) => {
    const subtotals = products.map(product => product.quantity * product.product.price);
    const subtotal = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
    const total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
    return { subtotal, total };
};

module.exports = calculateSubtotalAndTotal;

