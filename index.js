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


















































/*const express = require('express');
//Libreria para crear al usuario
const bodyPaser = require('body-parser');
const app = express();
//const connection = require("./connection.js");
//const query = require("./query.js");

app.use(bodyPaser.urlencoded({extended: false}));
app.use(bodyPaser.json());

//Se declara el Usuario
let usuario = {
    nombre: '',
    correo: '',
    km: ''
};
//Se declara la respuesta al usuario
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
//Crear usuario
app.post('/usuario', (req, res) => {
    
    if (!req.body.name || !req.body.correo || !req.body.km) {
        console.log(req.body.nombre);
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre, correo y km son requeridos'
        };
    } else {
        if(usuario.nombre !== '' || usuario.correo !== '') {
            respuesta = {
            error: true,
            codigo: 503,
            mensaje: 'El usuario ya fue creado previamente'  
            };
        } else { 
            usuario = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                km: req.body.km
            };
            / *connection();
            query(usuario.nombre, usuario.correo, usuario.km);
            * /
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario creado',
                respuesta: usuario
            };
        }
    }
    res.send(respuesta);
});
//obtener el usuario
/ *app.get('/usuario', (req, res) => {
    if (usuario.nombre === '' || usuario) {
        
    } else {
        
    }
})* /
//Se levanta servidor
app.listen(3000, ()=> {
    console.log(" El servidor esta inicializado en el puerto 3000");
});*/