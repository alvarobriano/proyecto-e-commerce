document.addEventListener('DOMContentLoaded', function() {
    const userProfileForm = document.getElementById("userProfileForm");

    // Usando el email que se guardo cuando el usuario se logeo en localStorage se hizo un if
    const userEmail = localStorage.getItem("username");
    if (userEmail) {
        document.getElementById("email").value = userEmail;
    } else {
        alert('Debes estar logueado para acceder al perfil.');
        window.location.href = "login.html";
    }

    userProfileForm.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const nombre = document.getElementById("nombre").value;
        const segundoNombre = document.getElementById("segundoNombre").value;
        const apellido = document.getElementById("apellido").value;
        const segundoApellido = document.getElementById("segundoApellido").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
    
        // Validar campos obligatorios
        if (!nombre || !apellido || !email) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }
    
        // Guardar en localStorage
        localStorage.setItem("userName", nombre);
        localStorage.setItem("userSecondName", segundoNombre);
        localStorage.setItem("userLastName", apellido);
        localStorage.setItem("userSecondLastName", segundoApellido);
        localStorage.setItem("loggedUserEmail", email);
        localStorage.setItem("userPhone", telefono);
    
        alert("Datos guardados correctamente.");
    });

    // Código para mostrar la imagen guardada o una por defecto
    let defaultProfileImage = "url_de_imagen_por_defecto.jpg";
    let savedProfileImage = localStorage.getItem("userProfileImage");

    if (savedProfileImage) {
        document.getElementById("displayedProfileImage").src = savedProfileImage;
    } else {
        document.getElementById("displayedProfileImage").src = defaultProfileImage;
    }

    // Funcionalidad para previsualizar y guardar la imagen seleccionada
    document.getElementById("profileImage").addEventListener("change", function(event) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("displayedProfileImage").src = e.target.result;
            localStorage.setItem("userProfileImage", e.target.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    });

    // Cargar datos previamente guardados en el formulario:
    // Nombre
    const savedNombre = localStorage.getItem("userName");
    if (savedNombre) {
        document.getElementById("nombre").value = savedNombre;
    }

    // Segundo nombre
    const savedSegundoNombre = localStorage.getItem("userSecondName");
    if (savedSegundoNombre) {
        document.getElementById("segundoNombre").value = savedSegundoNombre;
    }

    // Apellido
    const savedApellido = localStorage.getItem("userLastName");
    if (savedApellido) {
        document.getElementById("apellido").value = savedApellido;
    }

    // Segundo apellido
    const savedSegundoApellido = localStorage.getItem("userSecondLastName");
    if (savedSegundoApellido) {
        document.getElementById("segundoApellido").value = savedSegundoApellido;
    }

    // Email
    const savedEmail = localStorage.getItem("loggedUserEmail");
    if (savedEmail) {
        document.getElementById("email").value = savedEmail;
    }

    // Teléfono de contacto
    const savedTelefono = localStorage.getItem("userPhone");
    if (savedTelefono) {
        document.getElementById("telefono").value = savedTelefono;
    }

});
