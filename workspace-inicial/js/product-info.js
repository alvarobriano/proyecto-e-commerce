// Obtener el identificador del producto almacenado en el almacenamiento local
const selectedProductId = localStorage.getItem("selectedProductId");
const productInfoContainer = document.getElementById("product-info-container");
let historialComentarios = [];
let comentariosGuardados = localStorage.getItem("comentario");

function handleBtnComprar(ID) {
    // Recupera el arreglo de productos comprados del localStorage (si existe)
    const productosCompradosJSON = localStorage.getItem("productosComprados");
    const productosComprados = productosCompradosJSON ? JSON.parse(productosCompradosJSON) : [];

    // Agrega el nuevo ID al arreglo de productos comprados
    productosComprados.push(ID);

    // Convierte el arreglo actualizado en una cadena JSON
    const productosCompradosActualizado = JSON.stringify(productosComprados);

    // Almacena la cadena JSON actualizada en el localStorage
    localStorage.setItem("productosComprados", productosCompradosActualizado);  
};



//Entrega 3, parte 2
if (selectedProductId) {
  // URL de la API o de donde obtendrás la información del producto (reemplaza con tu URL)
  const PRODUCT_API_URL = `http://localhost:3000/products/${selectedProductId}`;
  const PRODUCT_COMMENTS_URL = `http://localhost:3000/products_comments/${selectedProductId}`;
  const PRODUCTS = `http://localhost:3000/cats_products/${localStorage.getItem("catID")}`;

  // Entrega 3, parte 2 y parte 3: Función para cargar y mostrar la información del producto y comentarios
  async function loadProductInfo() {
    try {
      // Realizar una solicitud GET para obtener la información del producto
      const response = await fetch(PRODUCT_API_URL);

      if (response.ok) {
        const productData = await response.json();

        // Llenar el contenedor con la información del producto
        //ENTREGA 5, ¡DESAFIATE! //AL H1 SIGUIENTE LE AGREGAMOS EL BOTON DE COMPRAR CON ESAS 3 CLASES, LA BTN SUCCESS VIENE DE BOOTSTRAP
        //Y ES LA QUE LE AGREGA ESE COLOR VERDE AL BOTÓN. ADEMAS A H1 LE PUSIMOS LA CLASE PRODUCT TITLE DEFINIDA EN CSS EN LINEA 316
        productInfoContainer.innerHTML += `<br>
                                            <div class="product-details">
                                              <h1 class="product-title">
                                                ${productData.name}
                                                <button id="btnComprar" class="btn btn-success btn-right" id="rangeFilterCount" onclick="handleBtnComprar(${productData.id})">Comprar</button>
                                              </h1>
                                              <hr>
                                              <h6><strong>Precio</strong></h6>
                                              <p>${productData.currency} ${productData.cost}</p>
                                              <h6><strong>Descripción</strong></h6>
                                              <p>${productData.description}</p>
                                              <h6><strong>Cantidad de vendidos</strong></h6>
                                              <p>${productData.soldCount}</p>
                                              <h6><strong>Imágenes ilustrativas</strong></h6>
                                              <div class="image-container">
                                                ${productData.images.map(image => `<img src="${image}" alt="${productData.description}">`).join('')}
                                              </div>
                                            </div>
                                            <br>
                                            <h2>Comentarios</h2>
        `;
      } else {
        // Manejar errores si la solicitud no es exitosa
        console.error("Error al obtener la información del producto.");
      }
    } catch (error) {
      console.error("Error en la carga de la información del producto:", error);
    }

    try {
      // Realizar una solicitud GET para obtener la información del producto
      const response_comments = await fetch(PRODUCT_COMMENTS_URL);

      if (response_comments.ok) {
        const productComments = await response_comments.json();

        // Llenar el contenedor con la información del producto
        for (let comentario of productComments){
          productInfoContainer.innerHTML += `                                        
          <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1"><strong>${comentario.user}</strong> - ${comentario.dateTime} - <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span></h6>
                    </div>
                    <p class="mb-1">${comentario.description}</p>
                </div>
            </div>
          </div>`;
          const comentarioDiv = productInfoContainer.lastElementChild.querySelectorAll(".fa.fa-star");

          for (let i=0; i<comentario.score; i++){
            comentarioDiv[i].classList.add('checked');
          }
        }
        
        //muestro el historial de comentarios guardado en el localStorage, si coincide con el ID del producto donde estoy
        if (comentariosGuardados) {
          const comentariosGuardadosArray = JSON.parse(comentariosGuardados);
          for (let comentario of comentariosGuardadosArray) {
            if (comentario.productID == selectedProductId){
              agregarComentario(comentario);
            }
          }
        };
        
      } else {
        // Manejar errores si la solicitud no es exitosa
        console.error("Error al obtener la información del producto.");
      }
    } catch (error) {
      console.error("Error en la carga de la información del producto:", error);
    }

    //Entrega 4, parte 1
    try {
       // Realizar una solicitud GET para obtener la información del producto
       const r_productos_recomendados = await fetch(PRODUCTS);

       //contenedor para poner la información
       const productRelated = document.getElementById("productRelated");

       if (r_productos_recomendados.ok) {
          const productos_recomendados = await r_productos_recomendados.json();
          
          //excluyo el producto actual en el que estoy
          const excludedProductIndex = productos_recomendados.products.findIndex(product => product.id == selectedProductId);
          const filteredProducts = productos_recomendados.products.filter((product, index) => index !== excludedProductIndex);
            
          //pongo las imágenes con cierta estructura, sólo me traigo las primeras 4 para no complicar el diseño
          //cuando hace click en una llama a función handleProductRelatedClick para cargar el contenido
          productRelated.innerHTML = `<div class="image-container">
                                        ${filteredProducts.slice(0, 4).map(product => `
                                          <button onclick="handleProductRelatedClick(${product.id})">
                                            <img src="${product.image}" alt="${product.name}">
                                            <h6>${product.name}</h6>
                                          </button>
                                        `).join('')}
                                      </div>`;

       }

    } catch (error) {
      console.error("Error en la carga de la información del producto:", error);
    }
  }

  // Llamar a la función para cargar la información del producto al cargar la página
  window.addEventListener("DOMContentLoaded", loadProductInfo);
} else {
  console.error("Identificador de producto no encontrado en el almacenamiento local.");
}



//función para cargar el contenido del producto seleccionado desde "Productos relacionados"
function handleProductRelatedClick(productId) {
  // Guardar el identificador del producto en el almacenamiento local
  localStorage.setItem("selectedProductId", productId);

  // Redirigir a product-info.html
  window.location.href = "product-info.html";
}

function agregarComentario(nuevoComentario) {
  // Actualizar el contenido HTML para mostrar el comentario
  productInfoContainer.innerHTML += `                                        
    <div class="list-group-item list-group-item-action cursor-active">
      <div class="row">
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1"><strong>${nuevoComentario.user}</strong> - ${nuevoComentario.dateTime} - <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span></h6>
              </div>
              <p class="mb-1">${nuevoComentario.description}</p>
          </div>
      </div>
    </div>`;

  // Marcar las estrellas en el nuevo comentario
  const comentarioDiv = productInfoContainer.lastElementChild.querySelectorAll(".fa.fa-star");

  for (let i = 0; i < nuevoComentario.score; i++) {
    comentarioDiv[i].classList.add('checked');
  }  
}

document.addEventListener("DOMContentLoaded", () => {

  const commentForm = document.getElementById("commentForm");
 
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const commentText = document.getElementById("comentarios").value;
    const rating = parseInt(document.getElementById("puntuacion").value);
    
    // Obtener la fecha y hora actual y convertir la fecha y hora en una cadena de texto
    var fechaHoraActual = new Date();
    var fechaHoraComoString = fechaHoraActual.toLocaleString(); // Obtendrás una cadena en formato localizado
  
    const nuevoComentario = {
      productID: selectedProductId,
      user: localStorage.getItem("username"),
      dateTime: fechaHoraComoString,
      description: commentText,
      score: rating,
    };

    //al array historialComentarios le guardo los que me traigo del localStorage
    if (comentariosGuardados){
      historialComentarios = JSON.parse(comentariosGuardados);
    }

    if (commentText.trim() === "") {
      alert("Por favor, ingresa un comentario.");
      return;
    }

    agregarComentario(nuevoComentario);

    // Agregar el comentario al historial
    historialComentarios.push(nuevoComentario);

    // Guardar el historial actualizado en el almacenamiento local
    localStorage.setItem("comentario", JSON.stringify(historialComentarios));    
    commentForm.reset();
  });

});
