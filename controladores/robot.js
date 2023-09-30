const asyncHandler = require('express-async-handler'); 

const pool = require('../configuraciones/database'); 

exports.obtenerPlatillos = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params; 
		if (id<0) {
			res.status(400).json({
				message: 'Numero de pagina no valido'
			}); 
		} 
		const sql = 'SELECT * FROM platillos ORDER BY nombre LIMIT ?, 1'; 
		const indexi = id-1; 

		const [result] = await pool.query(sql, indexi); 

		if (result.length == 0) {
			res.status(400).json({
				message: 'No se encontro el platillo'
			}); 
		} else {
			let platillo = result[0];
			res.setHeader('Content-Type', 'application/json'); 
			res.send(JSON.stringify(platillo));
		}
	} catch (err) {
		res.status(500).json({
			message: 'Error del servidor'
		});
	}
});

exports.insertarPlatillo = asyncHandler(async (req, res, next) => {
	try {
		const name = req.body.tituloPlatillo; 
		const description = req.body.descripcion; 
		const image = req.files['imagenPlatillo'][0].filename; 
		const video = req.files['videoPlatillo'][0].filename;

		const query = `INSERT INTO platillo_tipico(TITULO_PLATILLO,DESCRIPCION_PLATILLO,IMAGEN_PLATILLO,URL_VIDEO) VALUES(?,?,?,?)`;

		const [result] = await pool.query(query, [name, description, image, video]); 
		if (result.affectedRows >0 ) {
			res.status(200).json({
				message: 'Platillo registrado correctamente'
			})
		} else {
			res.status(500).json({
				message: 'Error en la base de datos'
			})
		}
	} catch (err) {
		res.status(500).json({
			message: 'Error interno del servidor'
		})
	}
});

exports.modificarPlatillo = asyncHandler(async (req, res, next) => {
	res.status(200);
});

exports.eliminarPlatillo = asyncHandler(async (req, res, next) => {
	res.status(200);
});