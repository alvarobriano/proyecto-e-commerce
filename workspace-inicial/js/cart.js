const userId = 101;
const cartUrl = `https://japceibal.github.io/emercado-api/cats_products/${userId}.json`;; 
const htmlCarro = document.getElementById("htmlCarrito");

async function obtenerDatosDelCarrito() {
  try {
      const response = await fetch(cartUrl);

      if (response.ok) {
          const carrito = await response.json();
         // mostrarInformacionEnTabla(carrito);
         // window.location.href = "cart.html";
          console.log(mostrarInformacionEnTabla(carrito));
      } else {
          console.error("Error al obtener el carrito de compras.");
      }
  } catch (error) {
      console.error("Error en la carga del carrito de compras:", error);
  }
}

function mostrarInformacionEnTabla(carrito) {
  for (let i = 0; i < carrito.products.length; i++) {
    if (carrito.products[i].id === 50924) {
      console.log("${carrito.products[i].name} - ${carrito.products[i].cost}");
      htmlCarro.innerHTML += `<p>${carrito.products[i].name} - ${carrito.products[i].cost}</p>`;
    }
  }
}








  