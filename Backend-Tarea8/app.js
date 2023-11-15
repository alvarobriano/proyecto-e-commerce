const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Manejador POST para 'cart'
app.post('/cart', (req, res) => {
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'cart', 'buy.json');
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'cat'
app.get('/cats', (req, res) => {
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'cats', 'cat.json');
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'cat_product/:id'
app.get('/cats_products/:id', (req, res) => {
    const id = req.params.id;
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'cats_products', `${id}.json`);
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'product/:id'
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'products', `${id}.json`);
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'product_comments/:id'
app.get('/products_comments/:id', (req, res) => {
    const id = req.params.id;
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'products_comments', `${id}.json`);
    servirArchivoJSON(rutaArchivo, res);
});

// Manejador POST para 'sell'
app.post('/sell', (req, res) => {
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'sell', 'publish.json');
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'user_cart/:id'
app.get('/user_cart/:id', (req, res) => {
    const id = req.params.id;
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'user_cart', `${id}.json`);
    servirArchivoJSON(rutaArchivo, res);
});


// Función para servir archivos JSON
function servirArchivoJSON(rutaArchivo, res) {
    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
            return;
        }
        res.json(JSON.parse(data));
    });
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
