const CATEGORIES_URL = "http://localhost:3000/cats/";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/";
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
                                            <li><a class="dropdown-item" onclick="handleCart()" href="#">Mi Carrito</a></li>
                                            <li><a class="dropdown-item" href="#" onclick="handleProfile()">Mi Perfil</a></li>
                                            <li><a class="dropdown-item" onclick="handleDarkMode()" href="#">Modo oscuro</a></li>
                                            <li><a class="dropdown-item" onclick="handleUsernameClick()" href="#">Cerrar Sesión</a></li>
                                          </ul>
                                        </div>`;
  return 0;
}

function handleUsernameClick() {
  // Borrar datos del usuario del Local Storage
  localStorage.removeItem('username'); // Reemplaza 'nombre_usuario' con el nombre de tu clave`
  localStorage.removeItem('productosComprados');

  // Redirigir a otra página, por ejemplo, la página de inicio de sesión
  window.location.href = "login.html";
}

function handleDarkMode() {
  const contenedor = document.body;
  contenedor.classList.toggle("dark-mode");
  const modoOscuro = contenedor.classList.contains("dark-mode");
  localStorage.setItem('modoOscuro', modoOscuro);
};

if (localStorage.getItem("username")){
  agregarCategoriaUsername(localStorage.getItem("username"));
}

function handleProfile() {
  window.location.href = "my-profile.html"; 
}

//FUNCION QUE LE DA FUNCIONALIDAD AL BOTON MICARRITO, LLEVANDOLO AL DIV DE CART.HTML
function handleCart() {
    window.location.href = "cart.html"; 
    obtenerDatosDelCarrito();
}

