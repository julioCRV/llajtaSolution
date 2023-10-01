const asyncHandler = require('express-async-handler'); 
const crypto = require('crypto'); 
const multer = require('../configuraciones/archivosMultimedia');
const pool = require('../configuraciones/database'); 

function codificar(valor) {
	const hash = crypto.createHash('sha256'); 
	hash.update(valor);
	return hash.digest('hex');
}
function decodificar(hash) {
	try {
		const valor = Buffer.from(hash, 'hex').toString('utf8'); 
		return valor; 
	} catch (err) {
		console.log('Error en la decodificacion', err);
		return null; 
	}
}

exports.obtenerPlatillos = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id; 
		if (id<0) {
			res.status(500).json({
				message: 'Numero de pagina no valido'
			}); 
			return;
		} 
		const sql = 'SELECT * FROM platillo_tipico ORDER BY TITULO_PLATILLO LIMIT ?, 1'; 
		const indexi = id-1; 

		const [result] = await pool.query(sql, indexi); 

		if (result.length == 0) {
			res.status(400).json({
				message: 'No se encontro el platillo'
			}); 
		} else {
			let platillo = result[0];
			const id_codificado =codificar(platillo.ID_PLATILLO); 
			platillo.ID_PLATILLO = id_codificado;
			res.setHeader('Content-Type', 'application/json'); 
			res.send(JSON.stringify(platillo));
		}
	} catch (err) {
		res.status(500).json({
			message: 'Error del servidor', 
			error: err
		});
	}
});

exports.insertarPlatillo = asyncHandler(async (req, res, next) => {
	try {
		console.log('Inicia insercion');

		multer.single('imagen')(req, res, async (err) => {
			if (err) {
				console.log(err)
				return;
			}
		});
		
		console.log('Correcto con el mdw de imagen');
		
		multer.single('video')(req, res, async (err) => {
			if (err) {
				console.log(err);
				return;
			}
		});

		console.log('Correcto con el mdw de video');

		const nombre = req.body.nombre; 
		const descripcion = req.body.descripcion; 
		const imagen = req.files['imagen'][0].buffer; 
		const video = req.files['video'][0].buffer;

		const query = 'INSERT INTO platillo_tipico(TITULO_PLATILLO,DESCRIPCION_PLATILLO,IMAGEN,VIDEO) VALUES(?,?,?,?)';

		console.log('Exitos al manejar los atributos');

		const [result] = await pool.query(query, [nombre, descripcion, imagen, video]); 
		
		console.log('Pudo hacer la query');

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
			message: 'Error interno del servidor general', 
			error: err
		})
	}
});
exports.modificarPlatillo = asyncHandler(async (req, res, next) => {
	try {
		let id = req.params.id; 
		id = decodificar(id); 
		if (id==null) {
			res.status(500).json({
				message: 'Error con el servidor', 
				error: 'Error de decodificacion del id'
			})
		}
		const {nombre, descripcion} = req.body; 
		const imagen = req.files['imagen'].buffer; 
		const video = req.files['video'].buffer; 

		const sql = 'UPDATE platillo_tipico SET NOMBRE_PLATILLO = ?, DESCRCIPCION =?, IMAGEN = ?, VIDEO = ? WHERE ID_PLATILLO = ?'; 
		const [result] = await pool.query(sql , [nombre, descripcion, imagen, video, id]); 

		if (result.affectedRows >0 ) {
			res.status(200).json({
				message: 'Platillo modificado correctamente'
			})
		} else {
			res.status(500).json({
				message: 'Error en la base de datos'
			})
		}
	} catch (err) {
		console.log(err); 
		res.status(500).json({
			message: 'Error del servidor', 
			error: err
		})
	}
});

exports.eliminarPlatillo = asyncHandler(async (req, res, next) => {
	try {
		let id = req.params.id; 
		id = decodificar(id);
		const sql = 'DELETE FROM platillo_tipico WHERE ID_PLATILLO = ?'
		const [result] = await pool.query(sql , [id]); 
		if (result.affectedRows >0 ) {
			res.status(200).json({
				message: 'Platillo eliminado correctamente'
			})
		} else {
			res.status(500).json({
				message: 'Error en la base de datos'
			})
		}
	} catch (err) {
		console.error(err); 
		res.status(500).json({
			message: 'Error del servidor'
		})
	}
});