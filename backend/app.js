const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
//const verificaToken = require('./middleware'); // Importar el middleware

const app = express();
const PORT = 3000;

// Clave secreta para JWT - Debería estar en una variable de entorno
const SECRET_KEY = 'tuClaveSecreta';

// Usuarios de ejemplo (en una implementación real, deberías consultar una base de datos)
const users = [
    { username: 'user1@mail.com', password: 'pass1' },
    { username: 'user2@mail.com', password: 'pass2' }
];

//middleware, lo defino en app.js porque si lo hago en un archivo aparte no funciona
function verificaToken(req, res, next) {
    // Obtener el token del encabezado de autorización
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no encontrado o en formato incorrecto.' });
    }
  
    // Separar la cadena para obtener solo el token
    const token = authorizationHeader.split(' ')[1];
  
    // Verificar el token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido o expirado.'});
      }
      // Decodificado correctamente, se puede adjuntar el usuario al objeto de solicitud para su uso posterior
      req.user = decoded;
      next(); // Continuar con la solicitud
    });
  }

app.use(cors());
app.options('*', cors());

// Colocar express.json() aquí para analizar el cuerpo de las solicitudes POST
app.use(express.json());

// Aplicar el middleware de autorización a la ruta '/cart'
app.use('/cart', verificaToken);

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
