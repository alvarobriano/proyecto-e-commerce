document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado a través de su email guardado en localStorage
    const userEmail = localStorage.getItem("username");
    if (!userEmail) {
        alert('Debes estar logueado para acceder al perfil.');
        window.location.href = "login.html";
        return; // Detiene la ejecución si el usuario no está logueado
    };

    // Función para cargar la información de perfil desde localStorage
    function loadUserProfile(email) {
        const userProfileString = localStorage.getItem(email);
        document.getElementById("email").value = email;

        if (userProfileString) {
            // Parsear los datos del usuario y cargarlos en el formulario
            const userProfile = JSON.parse(userProfileString);
            document.getElementById("nombre").value = userProfile.nombre || '';
            document.getElementById("segundoNombre").value = userProfile.segundoNombre || '';
            document.getElementById("apellido").value = userProfile.apellido || '';
            document.getElementById("segundoApellido").value = userProfile.segundoApellido || '';
            document.getElementById("telefono").value = userProfile.telefono || '';
            document.getElementById("displayedProfileImage").src = userProfile.profileImage || "img/img_perfil.png";
        } else {
            // Si no hay datos guardados, cargar imagen por defecto
            document.getElementById("displayedProfileImage").src = "img/img_perfil.png";
        }
    };

    // Cargar los datos del perfil del usuario
    if (userEmail) {
        loadUserProfile(userEmail);
    };    

    // Guardar la información del perfil del usuario en localStorage
    function saveUserProfile(email, data) {
        localStorage.setItem("username", data.email);
        localStorage.setItem(data.email, JSON.stringify(data));
        
        if (email != data.email) {
            localStorage.removeItem(email);
        }
    };

    // Evento para manejar cambios en la imagen de perfil
    document.getElementById("profileImage").addEventListener("change", function(event) {
        let reader = new FileReader();
        reader.onload = function(e) {
            // Actualizar la imagen mostrada
            document.getElementById("displayedProfileImage").src = e.target.result;
            // Obtener los datos actuales del formulario para actualizar la imagen
            const currentData = {
                nombre: document.getElementById("nombre").value,
                segundoNombre: document.getElementById("segundoNombre").value,
                apellido: document.getElementById("apellido").value,
                segundoApellido: document.getElementById("segundoApellido").value,
                email: document.getElementById("email").value,
                telefono: document.getElementById("telefono").value,
                profileImage: e.target.result
            };
            // Guardar los datos actualizados en localStorage
            saveUserProfile(userEmail, currentData);
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Evento para manejar el envío del formulario de perfil
    const userProfileForm = document.getElementById("userProfileForm");
    userProfileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Recopilar la información del formulario
        const userProfileData = {
            nombre: document.getElementById("nombre").value,
            segundoNombre: document.getElementById("segundoNombre").value,
            apellido: document.getElementById("apellido").value,
            segundoApellido: document.getElementById("segundoApellido").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            profileImage: document.getElementById("displayedProfileImage").src
        };

        // Guardar la información del perfil en localStorage
        saveUserProfile(userEmail, userProfileData);

        alert("Datos guardados correctamente.");
    });
});
