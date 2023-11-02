document.addEventListener("DOMContentLoaded", function() {
  // Se obtiene el formulario de login por su ID
  var loginForm = document.getElementById('loginForm');

  // Se añade el event listener para manejar el evento submit del formulario
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe de la forma tradicional

      // Obtener el valor del campo de correo electrónico
      var userEmail = document.getElementById('username').value;

      // Verificar si el correo electrónico ha sido ingresado
      if (userEmail == "") {
          alert("El usuario no está logueado, por favor rellene los campos");
      } else {
          // Guardar el correo electrónico en localStorage
          localStorage.setItem("username", userEmail);

          // Redireccionar al usuario al perfil o a la página que corresponda
          window.location.href = "index.html";
      }
  });
});
