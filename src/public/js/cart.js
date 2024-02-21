document.addEventListener('DOMContentLoaded', async () => {
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`/api/user-cart`, {
                    method: 'GET',
                });
                const data = await response.json();
                const cartId = data.cartId;
                if (!cartId) {
                    window.location.href = '/login';
                } else {
                    window.location.href = `/cart/${cartId}`;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    const cancelPurchaseButtons = document.querySelectorAll('.cancel-purchase-button');
    if (cancelPurchaseButtons) {
        cancelPurchaseButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const cartId = button.dataset.cartId;
                if (!cartId) return;
                try {
                    const response = await fetch(`/api/carts/${cartId}`, {
                        method: 'DELETE',
                    });
                    const data = await response.json();
                    console.log(data);
                    window.location.reload();
                } catch (error) {
                    console.error('Error cancelling purchase:', error);
                }
            });
        });
    }

    const trashIcons = document.querySelectorAll('.trash-icon');
    if (trashIcons) {
        trashIcons.forEach(icon => {
            icon.addEventListener('click', async () => {
                const cartId = icon.dataset.cartId;
                const productId = icon.dataset.productId;
                if (!cartId || !productId) return;
                try {
                    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                        method: 'DELETE',
                    });
                    const data = await response.json();
                    console.log(data);
                    window.location.reload();
                } catch (error) {
                    console.error('Error deleting product from cart:', error);
                }
            });
        });
    }
});
