document.addEventListener("DOMContentLoaded", function() {
  // Se obtiene el formulario de login por su ID
  var loginForm = document.getElementById('loginForm');

  // Se añade el event listener para manejar el evento submit del formulario
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe de la forma tradicional

      // Obtener el valor del campo de correo electrónico
      let userEmail = document.getElementById('username').value;
      let userPassword = document.getElementById('password').value;   

      // Verificar si el correo electrónico ha sido ingresado
      if (userEmail == "") {
          alert("El usuario no está logueado, por favor rellene los campos");
      } else {
          // Datos del usuario (username y password)
            const userData = {
                username: userEmail,
                password: userPassword // Asegúrate de tener la contraseña del usuario aquí
            };

            // Hacer la solicitud POST al servidor
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Credenciales incorrectas');
                }
                return response.json();
            })
            .then(data => {
                // Guardar el token en localStorage o usarlo según tu lógica de cliente
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', userEmail);

                // Redireccionar al usuario al perfil o página correspondiente
                window.location.href = 'index.html';
            })
            .catch(error => {
                // Manejar errores de autenticación
                alert(error.message);
            });
        }
  });
});
