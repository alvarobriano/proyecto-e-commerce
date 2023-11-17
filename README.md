# Proyecto-e-commerce
Repositorio dedicado al proyecto de desarrollo web
Instrucciones de Instalación y Ejecución del Proyecto

Este proyecto es un mono repositorio que incluye tanto un backend en Node.js como un frontend en JavaScript. Sigue las instrucciones a continuación para configurar y ejecutar ambos componentes.

Configuración Inicial
Clonar el Repositorio: Clona el repositorio a tu máquina local utilizando Git:

git clone https://github.com/alvarobriano/proyecto-e-commerce
cd Backend-Tarea8

Backend (Node.js)

Instalar Dependencias: Dentro del directorio del backend, instala las dependencias necesarias:
npm install

Ejecutar el Backend
Para iniciar el servidor backend, ejecuta:

node app.js

Si la configuración es correcta, verás un mensaje indicando que el servidor está corriendo en http://localhost:3000.

Frontend (JavaScript)

Configuración Inicial
Navegar al Directorio del Frontend: Cambia al directorio del frontend en tu proyecto:

cd ..
cd workspace-inicial

Instalar Dependencias: Asegúrate de instalar cualquier dependencia necesaria para tu frontend:

npm install

Ejecutar el Frontend
Para iniciar el frontend, simplemente ejecuta:

npm start

Esto debería abrir automáticamente el navegador por defecto y cargar la página principal del frontend.
URLs de Backend y Frontend
Este proyecto utiliza una serie de URLs específicas para la comunicación entre el backend y el frontend. A continuación se detallan estas URLs, proporcionando una guía clara de cómo se estructura la interacción entre ambos componentes del proyecto.

URLs del Backend
El backend, desarrollado con Node.js, expone varias rutas API que son consumidas por el frontend. Estas rutas incluyen:

Categorías: http://localhost:3000/cats/
Utilizada para obtener información sobre diferentes categorías.
Publicar Producto: http://localhost:3000/sell/
Endpoint para publicar nuevos productos.
Productos por Categoría: http://localhost:3000/cats_products/
Endpoint para obtener productos específicos por categoría.
Información del Producto: http://localhost:3000/products/
Utilizada para obtener detalles específicos de un producto.
Comentarios del Producto: http://localhost:3000/products_comments/
Endpoint para obtener comentarios asociados a un producto.
Información del Carrito de Usuario: http://localhost:3000/user_cart/
Utilizada para obtener la información del carrito de un usuario específico.
Compra del Carrito: http://localhost:3000/cart/
Endpoint para procesar la compra de los artículos en el carrito.
URLs del Frontend
El frontend, desarrollado en JavaScript, hace solicitudes a estas rutas para obtener y enviar datos. A continuación, se detallan las URLs utilizadas en el frontend para interactuar con el backend:

Obtener Categorías: CATEGORIES_URL
Corresponde a http://localhost:3000/cats/
Publicar Producto: PUBLISH_PRODUCT_URL
Corresponde a http://localhost:3000/sell/
Obtener Productos por Categoría: PRODUCTS_URL
Corresponde a http://localhost:3000/cats_products/
Obtener Detalles del Producto: PRODUCT_INFO_URL
Corresponde a http://localhost:3000/products/
Obtener Comentarios del Producto: PRODUCT_INFO_COMMENTS_URL
Corresponde a http://localhost:3000/products_comments/
Obtener Información del Carrito de Usuario: CART_INFO_URL
Corresponde a http://localhost:3000/user_cart/
Procesar Compra del Carrito: CART_BUY_URL
Corresponde a http://localhost:3000/cart/