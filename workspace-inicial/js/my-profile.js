document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem("loggedUserEmail");
    if (!userEmail) {
        alert('Debes estar logueado para acceder al perfil.');
        window.location.href = "login.html";
        return;
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const userProfileForm = document.getElementById("userProfileForm");
    if (userProfileForm) {
        loadUserProfile(userEmail);
        userProfileForm.addEventListener("submit", function(event) {
            event.preventDefault();
            saveUserProfile(userEmail);
        });
    }
});

function handleLogin(event) {
    event.preventDefault();

    const nombre = document.getElementById("username").value;
    const email = document.getElementById("useremail").value;

    if (!nombre || !email) {
        alert("Por favor rellene los campos");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = { username: nombre, email: email };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUserEmail", email);

    window.location.href = "index.html";
}

function loadUserProfile(userEmail) {
    const userProfile = JSON.parse(localStorage.getItem("userProfile_" + userEmail)) || {};
    document.getElementById("nombre").value = userProfile.nombre || "";
    document.getElementById("segundoNombre").value = userProfile.segundoNombre || "";
    document.getElementById("apellido").value = userProfile.apellido || "";
    document.getElementById("segundoApellido").value = userProfile.segundoApellido || "";
    document.getElementById("email").value = userProfile.email || userEmail;
    document.getElementById("telefono").value = userProfile.telefono || "";
}

function saveUserProfile(userEmail) {
    const nombre = document.getElementById("nombre").value;
    const segundoNombre = document.getElementById("segundoNombre").value;
    const apellido = document.getElementById("apellido").value;
    const segundoApellido = document.getElementById("segundoApellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    if (!nombre || !apellido || !email) {
        alert("Por favor, completa los campos obligatorios.");
        return;
    }

    const userProfile = {
        nombre: nombre,
        segundoNombre: segundoNombre,
        apellido: apellido,
        segundoApellido: segundoApellido,
        email: email,
        telefono: telefono
    };

    localStorage.setItem("userProfile_" + userEmail, JSON.stringify(userProfile));
    alert("Datos guardados correctamente.");
}
