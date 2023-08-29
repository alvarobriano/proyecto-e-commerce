document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm");
    const nombre = document.getElementById("username");

    

    loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); 
           
      if (nombre.value == "") {
        alert("El usuario no está logueado, por favor rellene los campos");
      } else {
        // Almacenar el nombre en localStorage para usarlo en home.js
        localStorage.setItem("username", nombre.value);
        window.location.href = "index.html";  // Redirigir a la página principal
      };  
         
    });
});