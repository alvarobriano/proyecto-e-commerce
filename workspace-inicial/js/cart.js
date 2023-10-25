// URL para cargar el carrito
const userId = 25801;
const cartUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;



function habilitarFormulario(formularioHabilitar, formularioDeshabilitar) {
  // Habilita el formulario seleccionado
  document.getElementById(formularioHabilitar).style.display = "block";
  
  // Deshabilita los campos del otro formulario
  const elementosDeshabilitar = document.querySelectorAll(`#${formularioDeshabilitar} input`);
  for (const elemento of elementosDeshabilitar) {
    elemento.disabled = true;
  }
  
  // Habilita los campos del formulario seleccionado
  const elementosHabilitar = document.querySelectorAll(`#${formularioHabilitar} input`);
  for (const elemento of elementosHabilitar) {
    elemento.disabled = false;
  }

  // Actualiza el mensaje de forma de pago
  const formaPagoSeleccionada = document.querySelector(`input[name="FormaPago"]:checked`);
  const mensajeFormaPago = document.getElementById("mensajeFormaPago");
  
  if (formaPagoSeleccionada) {
    mensajeFormaPago.textContent = `Forma de pago seleccionada: ${formaPagoSeleccionada.value}`;
  } else {
    mensajeFormaPago.textContent = "No se ha seleccionado";
  }
}



// Definición de funciones

function calcularSubtotal() {
  const subtotalElements = document.querySelectorAll('.subtotal');
  let totalUSD = 0;

  subtotalElements.forEach(subtotalElement => {
    const subtotalText = subtotalElement.textContent.trim();
    const subtotal = parseFloat(subtotalText.replace(/[^0-9.-]+/g, ""));

    const currency = subtotalElement.textContent.includes("UYU") ? "UYU" : "USD";
    if (currency === "UYU") {
      totalUSD += subtotal/40;
    } else {
      totalUSD += subtotal;
    }
  });

  const totalUSDElement = document.getElementById('totalAmountUSD');
  totalUSDElement.textContent = `USD ${totalUSD.toFixed(2)}`;
}


function actualizarSubtotal(input, precioUnitario, currency) {
  const cantidad = parseInt(input.value, 10); // Obtiene el valor del input como un número entero

  if (cantidad <= 0) {
    alert("La cantidad de artículos debe ser mayor o igual a 1");
    input.value = 1; // Restablece la cantidad a 1
  }

  const subtotal = input.value * precioUnitario; // Calcula el subtotal
  const subtotalElement = input.parentElement.nextElementSibling; // Obtiene el elemento donde mostrar el subtotal
  subtotalElement.textContent = `${currency} ${subtotal.toFixed(2)}`;

  // Llama a la función para calcular y mostrar el total
  calcularSubtotal();

;

  // Obtiene el valor del radio button tipoEnvio seleccionado
  const tipoEnvioRadios = document.getElementsByName("tipoEnvio");
  let tipoEnvioSeleccionado = null;

  for (const radio of tipoEnvioRadios) {
    if (radio.checked) {
      tipoEnvioSeleccionado = radio.value;
      break; // Rompe el bucle si encuentra un radio seleccionado
    }
  }

  // Ahora tienes el valor de tipoEnvioSeleccionado
  updateTotalyEnvio(tipoEnvioSeleccionado);
}


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

  htmlCarro.innerHTML += `    <tr>
                                <td class="text-center"><img src="img/prod50924_1.jpg" alt="${carrito.articles[0].name}" style="max-width: 50px;"></td>
                                <td>${carrito.articles[0].name}</td>
                                <td>${carrito.articles[0].currency} ${carrito.articles[0].unitCost}</td>
                                <td>
                                    <input type="number" value="1" min="1" onchange="actualizarSubtotal(this, ${carrito.articles[0].unitCost}, '${carrito.articles[0].currency}')">
                                </td>
                                <td class="subtotal">${carrito.articles[0].currency} ${carrito.articles[0].unitCost}</td>
                              </tr>`;

  const productosCompradosJSON = localStorage.getItem("productosComprados");
  if (productosCompradosJSON) {
    const productosComprados = productosCompradosJSON ? JSON.parse(productosCompradosJSON) : [];

    for (let producto of productosComprados) {
      console.log(producto);
      try {
        const responseProd = await fetch(`https://japceibal.github.io/emercado-api/products/${producto}.json`);

        if (responseProd.ok) {
          const productoInfo = await responseProd.json();

          htmlCarro.innerHTML += `    <tr>
                                    <td class="text-center"><img src="img/prod${producto}_1.jpg" alt="${carrito.articles[0].name}" style="max-width: 50px;"></td>
                                    <td>${productoInfo.name}</td>
                                    <td>${productoInfo.currency} ${productoInfo.cost}</td>
                                    <td>
                                        <input type="number" value="1" min="1" onchange="actualizarSubtotal(this, ${productoInfo.cost}, '${productoInfo.currency}')">
                                    </td>
                                    <td class="subtotal">${productoInfo.currency} ${productoInfo.cost}</td>
                                  </tr>`;
        }
      } catch (error) {
        console.error("Error al obtener el carrito de compras.");
      }
    }
  }

  // Calcular y mostrar el total
  calcularSubtotal();
}

// Función para actualizar el subtotal total
function updateTotalyEnvio(selectedShippingOption) {
  const subtotalElement = document.getElementById("totalAmountUSD");
  const shippingCostElement = document.getElementById("shippingCostUSD");

  // Definir los porcentajes de costo para cada opción
  const shippingOptions = {
    Premium: 0.15,  // 15%
    Express: 0.07,  // 7%
    Standard: 0.05  // 5%
  };

  // Obtener el porcentaje de costo del objeto shippingOptions
  const selectedShippingPercentage = shippingOptions[selectedShippingOption];      

  // Obtén el valor del subtotal del elemento HTML
  const subtotalText = subtotalElement.textContent;
  
  // Extrae el valor numérico del subtotal (eliminando "USD " del inicio)
  const subtotal = parseFloat(subtotalText.replace("USD ", ""));

  // Obtener el costo total en función del porcentaje
  const totalShippingCost = selectedShippingPercentage * subtotal; // Suponiendo que el costo base es 100.0 USD

  // Actualizar el costo de envío en la página
  shippingCostElement.textContent = `USD ${totalShippingCost.toFixed(2)}`;

  // Supongamos que tienes un elemento que muestra el subtotal en tu HTML
  const totalElement = document.getElementById("Total");

  const total = subtotal + totalShippingCost;

  // Actualiza el elemento que muestra el total
  totalElement.textContent = `USD ${total.toFixed(2)}`;
}

// Llamar a la función para cargar la información del producto al cargar la página
window.addEventListener("DOMContentLoaded", obtenerDatosDelCarrito);


document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos relevantes
  const radioButtons = document.getElementsByName("tipoEnvio");
  // Obtén el elemento de feedback para el tipo de envío
  const tipoEnvioFeedback = document.getElementById("tipoEnvioFeedback");
  const tipoDireccionFeedback = document.getElementById("tipoDireccionFeedback");
  // Obtén el botón "Finalizar compra"
  const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

  // Escuchar cambios en los botones de radio
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      // Obtener el valor del botón de radio seleccionado (como una cadena de texto)
      const selectedShippingOption = radioButton.value;

      // Llamar a una función para actualizar el subtotal total
      updateTotalyEnvio(selectedShippingOption);
    });
  });

  

  // Obtén los elementos de los campos de dirección de envío
  const calleInput = document.getElementById("calle");
  const numeroInput = document.getElementById("numero");
  const esquinaInput = document.getElementById("esquina");

    

  // Escucha los cambios en los campos de dirección de envío
  calleInput.addEventListener("input", habilitarBotonCompra);
  numeroInput.addEventListener("input", habilitarBotonCompra);
  esquinaInput.addEventListener("input", habilitarBotonCompra);

  function habilitarBotonCompra() {
    const camposValidos = [];
    const tipoEnvioRadios = document.getElementsByName("tipoEnvio");
    
  
    // Valida cada campo de dirección individualmente
    if (calleInput.value) {
      calleInput.classList.remove("is-invalid");
      camposValidos.push(true);
    } else {
      calleInput.classList.add("is-invalid");
      camposValidos.push(false);
    }
  
    if (numeroInput.value) {
      numeroInput.classList.remove("is-invalid");
      camposValidos.push(true);
    } else {
      numeroInput.classList.add("is-invalid");
      camposValidos.push(false);
    }
  
    if (esquinaInput.value) {
      esquinaInput.classList.remove("is-invalid");
      camposValidos.push(true);
    } else {
      esquinaInput.classList.add("is-invalid");
      camposValidos.push(false);
    }
  
    // Verifica si al menos un botón de tipo de envío está seleccionado
    const tipoEnvioSeleccionado = Array.from(tipoEnvioRadios).some(radio => radio.checked);
    const formaPagoRadios = document.getElementsByName("FormaPago");
    const formaPagoSeleccionada = Array.from(formaPagoRadios).some(radio => radio.checked);
  
    // Muestra el feedback para los campos de dirección, tipo de envío y forma de pago
    tipoDireccionFeedback.textContent = camposValidos.every(Boolean)
      ? ""
      : "Por favor, complete todos los campos de dirección de envío.";
    tipoEnvioFeedback.textContent = tipoEnvioSeleccionado
      ? ""
      : "Por favor, seleccione un tipo de envío.";
    
  
    // Habilita o deshabilita el botón en función de si todos los campos son válidos
    btnFinalizarCompra.disabled = !(camposValidos.every(Boolean) && tipoEnvioSeleccionado);
  }
  
  

  // Llama a la función al cargar la página para comprobar el estado inicial
  habilitarBotonCompra();
});
