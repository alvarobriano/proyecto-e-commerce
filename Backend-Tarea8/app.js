const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Clave secreta para JWT - Debería estar en una variable de entorno
const SECRET_KEY = 'tuClaveSecreta';

// Usuarios de ejemplo (en una implementación real, deberías consultar una base de datos)
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

app.use(cors());
app.options('*', cors());

// Colocar express.json() aquí para analizar el cuerpo de las solicitudes POST
app.use(express.json());

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

// Ruta para 'cats_products/:id'
app.get('/cats_products/:id', (req, res) => {
    const id = req.params.id;
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'cats_products', `${id}.json`);
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'products/:id'
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'products', `${id}.json`);
    servirArchivoJSON(rutaArchivo, res);
});

// Ruta para 'products_comments/:id'
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

// Endpoint POST para '/login'
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar las credenciales del usuario
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).send('Credenciales incorrectas');
    }

    // Generar el token JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Enviar el token al cliente
    res.json({ token });
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
//Esta es la parte 3 de la entrega 8 
function verificarToken(req, res, next) {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Se requiere un token para autenticación');
    }

    try {
        // Verificar el token
        const verificado = jwt.verify(token, SECRET_KEY);
        // Añadir los datos del usuario decodificados a la solicitud
        req.usuario = verificado;
        next(); // Pasar al siguiente middleware o manejador de ruta
    } catch (error) {
        res.status(401).send('Token inválido o expirado');
    }
}
// Aplicar el middleware verificarToken solo a esta ruta
app.post('/cart', verificarToken, (req, res) => {
    const rutaArchivo = path.join(__dirname, 'emercado-api-main', 'cart', 'buy.json');
    servirArchivoJSON(rutaArchivo, res);
});
