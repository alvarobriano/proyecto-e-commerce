document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    window.onload = function () {
        if (!isAuthenticated()) {
            alert("No estás logueado, logueate")
            window.location.href = "login.html";
        }
    };
    
    function isAuthenticated() {
        let nombre = localStorage.getItem("username");
        if (nombre){
            return true;
        } else {
            return false;
        }
    }

    /*function agregarCategoria (nombre_usuario) {
        const username_index = document.getElementById("navbarNav_index");
        const username_cat = document.getElementById("navbarNav_cat");
        const username_sell = document.getElementById("navbarNav_sell");
        const cat_nombre_usuario = document.createElement('li');
        
        cat_nombre_usuario.innerHTML = `${nombre_usuario}`;
        cat_nombre_usuario.classList.add("nav-nombre");

        username_index.appendChild(cat_nombre_usuario);
        username_cat.appendChild(cat_nombre_usuario);
        username_sell.appendChild(cat_nombre_usuario);
        return 0;
    }

    if (localStorage.getItem("username")) {
        agregarCategoria(localStorage.getItem("username"));
    };*/
    
});