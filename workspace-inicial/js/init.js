const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

window.addEventListener('DOMContentLoaded', () => {
  const modoOscuroGuardado = localStorage.getItem('modoOscuro');
  const contenedor = document.body; // Debes seleccionar el contenedor principal correcto

  if (modoOscuroGuardado === 'true') {
    contenedor.classList.add("dark-mode");
  } else {
    contenedor.classList.remove("dark-mode");
  }
});

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });    
}

//<p class="nav-nombre">${nombre_usuario}</p>

//código de la parte 1
function agregarCategoriaUsername (nombre_usuario) {
  const username = document.getElementsByClassName("navbar-nav")[0];
  username.lastElementChild.innerHTML = `<div class="dropdown">
                                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            ${nombre_usuario}
                                          </button>
                                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">Mi Carrito</a></li>
                                            <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
                                            <li><a class="dropdown-item" onclick="handleDarkMode()" href="#">Modo oscuro</a></li>
                                            <li><a class="dropdown-item" onclick="handleUsernameClick()" href="#">Cerrar Sesión</a></li>
                                          </ul>
                                        </div>`;
  return 0;
}

function handleUsernameClick() {
  // Borrar datos del usuario del Local Storage
  localStorage.removeItem('username'); // Reemplaza 'nombre_usuario' con el nombre de tu clave

  // Redirigir a otra página, por ejemplo, la página de inicio de sesión
  window.location.href = "login.html";
}

function handleDarkMode() {
  //const contenedor = document.querySelector("main");
  const contenedor = document.body;

  contenedor.classList.toggle("dark-mode");

  // Guarda el estado en el Local Storage
  const modoOscuro = contenedor.classList.contains("dark-mode");
  localStorage.setItem('modoOscuro', modoOscuro);
};

if (localStorage.getItem("username")){
  agregarCategoriaUsername(localStorage.getItem("username"));
}
