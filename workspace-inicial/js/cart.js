const userId = 25801;
const cartUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`; 


// Llamar a la función para cargar la información del producto al cargar la página
window.addEventListener("DOMContentLoaded", obtenerDatosDelCarrito);

async function obtenerDatosDelCarrito() {
  try {
      const response = await fetch(cartUrl);

      if (response.ok) {
          const carrito = await response.json();
          console.log(carrito);
          mostrarInformacionEnTabla(carrito);
         // window.location.href = "cart.html";
      } else {
          console.error("Error al obtener el carrito de compras.");
      }
  } catch (error) {
      console.error("Error en la carga del carrito de compras:", error);
  }
}

async function mostrarInformacionEnTabla(carrito) {
  const htmlCarro = document.getElementById("tablaCarrito");

  htmlCarro.innerHTML +=   `    <tr>
                                  <td class="text-center"><img src="img/prod50924_1.jpg" alt="${carrito.articles[0].name}" style="max-width: 50px;"></td>
                                  <td>${carrito.articles[0].name}</td>
                                  <td>${carrito.articles[0].currency} ${carrito.articles[0].unitCost}</td>
                                  <td>
                                      <input type="number" value="1" min="1" onchange="actualizarSubtotal(this, ${carrito.articles[0].unitCost}, '${carrito.articles[0].currency}')">
                                  </td>
                                  <td class="subtotal">${carrito.articles[0].currency} ${carrito.articles[0].unitCost}</td>
                                </tr>`

  const productosCompradosJSON = localStorage.getItem("productosComprados");
  if (productosCompradosJSON) {
    const productosComprados = productosCompradosJSON ? JSON.parse(productosCompradosJSON) : []
    
    for (let producto of productosComprados) {
      console.log(producto)
      try {
        const responseProd = await fetch(`https://japceibal.github.io/emercado-api/products/${producto}.json`);
  
        if (responseProd.ok) {
            const productoInfo = await responseProd.json();

            htmlCarro.innerHTML +=   `    <tr>
                                            <td class="text-center"><img src="img/prod${producto}_1.jpg" alt="${carrito.articles[0].name}" style="max-width: 50px;"></td>
                                            <td>${productoInfo.name}</td>
                                            <td>${productoInfo.currency} ${productoInfo.cost}</td>
                                            <td>
                                                <input type="number" value="1" min="1" onchange="actualizarSubtotal(this, ${productoInfo.cost}, '${productoInfo.currency}')">
                                            </td>
                                            <td class="subtotal">${productoInfo.currency} ${productoInfo.cost}</td>
                                          </tr>`
        }      
      } catch (error) {
        console.error("Error al obtener el carrito de compras.")
      }
    }
  }
  //   {
  //     "user": 25801,
  //     "articles": [
  //         {
  //             "id": 50924,
  //             "name": "Peugeot 208",
  //             "count": 1,
  //             "unitCost": 15200,
  //             "currency": "USD",
  //             "image": "img/prod50924_1.jpg"
  //         }
  //     ]
  // }
}

function actualizarSubtotal(input, precioUnitario, currency) {
  const cantidad = parseInt(input.value, 10); // Obtiene el valor del input como un número entero

  const subtotal = cantidad * precioUnitario; // Calcula el subtotal
  const subtotalElement = input.parentElement.nextElementSibling; // Obtiene el elemento donde mostrar el subtotal

  // Actualiza el contenido del elemento con el nuevo subtotal, incluyendo el símbolo de la moneda
  subtotalElement.textContent = `${currency} ${subtotal.toFixed(2)}`;
}








  