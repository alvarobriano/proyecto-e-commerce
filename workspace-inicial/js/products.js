const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//parte 2
const DATA_AUTO_URL = `http://localhost:3000/cats_products/${localStorage.getItem("catID")}`;

// Entrega 3, parte 1: Agrega esta función para manejar el clic en un producto
// Esta función es llamada cuando se apreta el botón "ver detalles" de la línea 41
function handleProductClick(productId) {
  // Guardar el identificador del producto en el almacenamiento local
  localStorage.setItem("selectedProductId", productId);

  // Redirigir a product-info.html
  window.location.href = "product-info.html";
}

async function showProductList(product) {
  let product_local = await product;
  let htmlContentToAppend = "";
  for (let i = 0; i < product_local.length; i++) {
    let current_car = product_local[i];

    let ruta_img = "img/prod" + current_car.id + "_";
    console.log(ruta_img);

    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action cursor-active">
  <div class="row">
    <div class="col-3">
      <div id="carousel${current_car.id}" class="carousel slide" data-bs-ride="carousel">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${ruta_img}1.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${ruta_img}2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${ruta_img}3.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${ruta_img}4.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
        </div>
        <!-- Agrega controles de carrusel (flechas) si lo deseas -->
        <a class="carousel-control-prev" href="#carousel${current_car.id}" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carousel${current_car.id}" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </a>
      </div>
    </div>
    <div class="col">
      <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1">${current_car.name} - ${current_car.currency} ${current_car.cost}</h4>
        <small class="text-muted">${current_car.soldCount} vendidos</small>
      </div>
      <p class="mb-1">${current_car.description}</p>
      <!-- Agrega un botón para cada producto que llame a la función handleProductClick -->
      <button class="btn btn-primary" onclick="handleProductClick(${current_car.id})">Ver Detalles</button>
    </div>
  </div>
</div>
      `;
  }

  document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

async function pedirDatos(url) {
  let promise = await fetch(url);

  if (promise.ok) {
    let datos = await promise.json();
    return datos.products;
  } else {
    alert("Error");
  }
}

//Muestro los productos
showProductList(pedirDatos(DATA_AUTO_URL));

//entrega 2 parte 3: funcion que ordena alfabéticamente y por cantidad de vendidos
async function sortAndShowProducts(sortCriteria) {
  let currentArray = await pedirDatos(DATA_AUTO_URL);
  switch (sortCriteria) {
    case ORDER_ASC_BY_NAME:
      currentArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;
    case ORDER_DESC_BY_NAME:
      currentArray.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      break;
    case ORDER_BY_PROD_COUNT:
      currentArray.sort((a, b) => {
        return a.soldCount - b.soldCount;
      });
      break;

    default:
      return null;
  }

  showProductList(currentArray);
}

// funcion que filtra según precio que se requiera
async function filterAndShowProducts(minPrice, maxPrice) {
  let currentArray = await pedirDatos(DATA_AUTO_URL);

  // Filtrar los productos en función del rango de precio
  let filteredArray = currentArray.filter(product => {
    if (minPrice !== undefined && product.cost < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && product.cost > maxPrice) {
      return false;
    }
    return true;
  });

  showProductList(filteredArray);
};

async function filterAndShowProductsBySearch(searchTerm) {
  let currentArray = await pedirDatos(DATA_AUTO_URL);

  if (searchTerm !== "") {
    let filteredArray = currentArray.filter(product => {
      const productNameLower = product.name.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      return productNameLower.includes(searchTerm) || descriptionLower.includes(searchTerm);
    });

    showProductList(filteredArray);
  } else {
    showProductList(currentArray);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //parte 3: cuando se hace click llama a sortAndShowProducts para ordenar alfabéticamente   
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_COUNT);
  });

  // cuando se hace click en filtrar llama a la funcion que filtra y muestra
  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount);
    }
    else {
      minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = undefined;
    }

    filterAndShowProducts(minCount, maxCount);
  });

  //cuando se ingresa texto en el buscador llama a la funcion que filtra y muestra    
  document.getElementById("productSearch").addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();
    filterAndShowProductsBySearch(searchTerm);
  });
  // cuando se hace click en limpiar se limpian todas las variables y se muestra toda la lista de productos sin filtro
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductList(pedirDatos(DATA_AUTO_URL));
  });
});
