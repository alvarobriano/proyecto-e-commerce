//Necesito precio, nombre, descripción, cantidad vendidos e imagen

const DATA_AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

async function showProductList(product){

    let product_local = await product;
    let htmlContentToAppend = "";
    for(let i = 0; i < product_local.length; i++){
        let current_car = product_local[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${current_car.image}" alt="${current_car.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${current_car.name} - ${current_car.currency} ${current_car.cost}</h4>
                            <small class="text-muted">${current_car.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${current_car.description}</p>
                    </div>
                </div>
            </div>
            `
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