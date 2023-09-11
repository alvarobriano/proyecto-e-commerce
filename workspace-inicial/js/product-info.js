// Obtener el identificador del producto almacenado en el almacenamiento local
const selectedProductId = localStorage.getItem("selectedProductId");

if (selectedProductId) {
  // URL de la API o de donde obtendrás la información del producto (reemplaza con tu URL)
  const PRODUCT_API_URL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;
  const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`

  // Función para cargar y mostrar la información del producto
  async function loadProductInfo() {
    const productInfoContainer = document.getElementById("product-info-container");

    try {
      // Realizar una solicitud GET para obtener la información del producto
      const response = await fetch(PRODUCT_API_URL);
      //const response_comments = await fetch(PRODUCT_COMMENTS_URL);

      if (response.ok) {
        const productData = await response.json();
        //const productComments = await response_comments.json();

        // Llenar el contenedor con la información del producto
        
        productInfoContainer.innerHTML += `<br>
                                          <h1>${productData.name}</h1>
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
                                          <br>
                                          <br> 
                                          <h2>Comentarios</h2>
                                           `
                                          ;
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
            comentarioDiv[i].classList.add('checked')
          }
        }
        
      } else {
        // Manejar errores si la solicitud no es exitosa
        console.error("Error al obtener la información del producto.");
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
