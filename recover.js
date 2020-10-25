const mysql = require('mysql');

module.exports = (respuesta) => {
    //Se crea coneccion a la base mysql
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'level',
        port: 3306
    });
    connection.connect((error) => {
        if(error){
           throw error;
        }else{
            console.log('Conexion correcta');
        }
    });

    connection.query('SELECT * FROM usuarios',
    (error, result) => {
        connection.end();
        if(error){
            throw error;
        }else{
            respuesta.json(result);
        }
    });
}