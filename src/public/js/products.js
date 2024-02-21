document.querySelectorAll('.cart-button').forEach(function(btn) {
  btn.addEventListener('click', async function() {
      let productId = this.dataset.productId;
      let cartId = this.dataset.cartId;

      if (!cartId) {
          try {
              const response = await fetch(`/api/user-cart`, {
                  method: 'GET',
              });
              const data = await response.json();
              cartId = data.cartId;
          } catch (error) {
              console.error(error);
          }
      }

      console.log('Product ID:', productId);
      console.log('Cart ID:', cartId);

      if (!cartId) {
          createCart()
              .then(data => {
                  console.log(data);
                  cartId = data.cartId;
                  updateUserCart(cartId)
                      .then(updatedUser => {
                          console.log('User updated:', updatedUser);
                          addProductToCart(cartId, productId);
                      })
                      .catch(error => {
                          console.error('Error updating user:', error);
                      });
              })
              .catch(error => {
                  console.error('Error creating cart:', error);
              });
      } else {
          addProductToCart(cartId, productId);
      }
  });
});

async function createCart() {
  try {
      const response = await fetch(`/api/carts`, {
          method: 'POST',
      });
      return response.json();
  } catch (error) {
      throw error;
  }
}

async function updateUserCart(cartId) {
  try {
      const response = await fetch(`/api/users/update-cart`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartId: cartId }),
      });
      return response.json();
  } catch (error) {
      throw error;
  }
}

function addProductToCart(cartId, productId) {
  fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      showSuccessMessage();
  })
  .catch(error => {
      console.error('Error adding product to cart:', error);
  });
}

function showSuccessMessage() {
  const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
  });

  Toast.fire({
      icon: 'success',
      title: 'Producto agregado correctamente',
  });
}

