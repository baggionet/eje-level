const express = require("express");
//Libreria para crear al usuario
const bodyParser = require('body-parser');
const app = express();
const add = require("./add.js");
const recover = require("./recover.js");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//SE declara el usuario
let usuario = {
    nombre: '',
    correo: '',
    km: ''
};

//Se declara la respuesta
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

//Ruta de inicio
app.get('/', (req, res) => {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

//Obtener todos los registros
app.get('/usuario', (req, res) => {
    recover(res);
});

//Agregar los usuarios
app.post('/usuario', (req, res) => {
    if (!req.body.nombre || !req.body.correo || !req.body.km) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y apellido son requeridos'
        };
    } else if (req.body.km >= 5) {
                usuario = {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    km: req.body.km
                };
                add(usuario.nombre, usuario.correo, usuario.km);
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Usuario creado',
                    respuesta: usuario
                };
            } else {
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Debes de caminar más'
                };
            }
    
    res.send(respuesta);
});

app.listen(3000, ()=> {
    console.log(" El servidor esta inicializado en el puerto 3000");
});
