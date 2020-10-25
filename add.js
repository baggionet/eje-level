const mysql = require('mysql');

module.exports = (nombre, correo, km) => {
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
    var query = connection.query('INSERT INTO usuarios( nombre, correo, km) VALUES(?,?,?)', [nombre, correo, km],
    (error, result) => {
        connection.end();
        if(error){
            throw error;
        }else{
            console.log(result);
        }
    });
    
}