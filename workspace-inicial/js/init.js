const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

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

function agregarCategoriaUsername (nombre_usuario) {
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
  agregarCategoriaUsername(localStorage.getItem("username"));
};