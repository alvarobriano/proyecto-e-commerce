document.addEventListener("DOMContentLoaded", function(){
    //Acá borre los 3 getelementbyId porque ya esta en categories.js, linea 38.
    //en products.js, linea 3, se cambio lo de adentro por ${localStorage.getItem("catID")}

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
});