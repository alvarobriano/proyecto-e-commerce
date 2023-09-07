// Obtener el identificador del producto almacenado en el almacenamiento local
const selectedProductId = localStorage.getItem("selectedProductId");

if (selectedProductId) {
  // URL de la API o de donde obtendrás la información del producto (reemplaza con tu URL)
  const PRODUCT_API_URL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

  // Función para cargar y mostrar la información del producto
  async function loadProductInfo() {
    try {
      // Realizar una solicitud GET para obtener la información del producto
      const response = await fetch(PRODUCT_API_URL);

      if (response.ok) {
        const productData = await response.json();

        // Llenar el contenedor con la información del producto
        const productInfoContainer = document.getElementById("product-info-container");
        productInfoContainer.innerHTML = `
          <h1>${productData.name}</h1>
          <br>
          <h4>Precio</h4>
          <p>Precio: ${productData.currency} ${productData.cost}</p>
          <br>
          <h4>Descripcion</h4>
          <p>${productData.description}</p>
          <br>
          <h4>Cantidad de vendidos</h4>
          <p>${productData.soldCount}</p>
          <br>
          <h4>Imagenes Ilustrativas</h4>
          ${productData.images.map(image => `
            <img src="${image}" alt="${productData.description}">
          `).join('')}
          <!-- Puedes agregar más información aquí -->
        `;
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
