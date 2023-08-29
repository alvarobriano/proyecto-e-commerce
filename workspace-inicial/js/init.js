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

//esta funcion verifica que existe algo en usuario y lo agrega a la navbar (barra de arriba). 
function usuario () {
  if (localStorage.getItem("username")) { 
    const perfil= document.getElementsByClassName("navbar-nav")[0] //buscamos por clases, la clase navbar-nuv estaba en la linea 22 de index.html (el ul). 
    //el [0] porque aunque el ultimo es solo uno, te crea un array, por lo que tenes que entrar a la poisicion 0 para obtener ese ultimo 

    if (perfil.lastElementChild) { //lastchild basicamente que agarre el ultimo hijo (en este caso li, puede ser p o lo que sea) del "ul"
      perfil.lastElementChild.classList.add("nav-boton") //esto le agrega la clase que creamos para el usuario, color blanco y demas
      perfil.lastElementChild.innerHTML = localStorage.getItem("username") //esto agrega a la pagina lo que contenga la variable "username"
    }
  }
}

usuario() 
