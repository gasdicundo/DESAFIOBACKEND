function submitForm() {

    const formData = {
        email: document.getElementById('usuario').value.toUpperCase(),
        password: document.getElementById('password').value,
    }

    
    fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.status === 'success') { 
            window.location.href = '/api/products'; 
        } else {
            
            console.log("Inicio de sesión fallido")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o Contraseña incorrecta",
              });
        }
    })
    .catch(error => console.error('Error:', error))
}


const registrate = document.getElementById('Registrate')


registrate.addEventListener('click', () => {
    window.location.href = '/signup'
})
