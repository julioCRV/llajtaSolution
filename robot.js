const express = require('express'); 
const mysql = require('mysql'); 
const bodyparser = require('body-parser'); 

const app = express(); 
const port = 5000; 


app.use(bodyparser.json()); 

const db = mysql.createConnection({
	// aqui vienen credenciales
});

db.connect((err) => {
	if (err) {
		throw err; 
	}
	console.log('Conexion a la base de datos MySQL exitosa');
});

app.get('get method', (req, res) => {
	const user_id = req.query.userID; 
	/// que es lo que envio al frontend? :v
	var nombre_tabla = ':v';
	var sql = `SELECT * FROM ${nombre_tabla}`; 
	db.query(sql, (err, results) => {
		if (err) {
			throw err; 
		}
		res.json(results); // envio los resultados por medio de un json 
	});
});

