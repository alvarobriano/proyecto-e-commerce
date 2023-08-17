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
            window.location.href = "login.html";
        }
    };
    
    function isAuthenticated() {
        let nombre = sessionStorage.getItem("username");
        if (nombre){
            return true;
        } else {
            return false;
        }
    }
});