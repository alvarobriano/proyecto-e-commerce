//
const DATA_AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

async function showData(dataArray) {
    // El for itera sobre los elementos del array
    let data = await dataArray;
    for (const item of data) {
      // En la siguiente línea se utilizan "backticks" para armar el String. Más info => https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
      container.innerHTML += `<p> ${item.name} ${item.lastname} </p>`; // Se concatena cada párrafo de la manera que queremos mostrarlo al innerHTML del contenedor
    }
  }


async function pedirDatos(url) {
    let promise = await fetch(url);
  
    if (promise.ok) {
      let datos = await promise.json();
      return datos.students;
    } else {
      alert("Error");
    }
  }