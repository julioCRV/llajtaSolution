const express = require('express');
const router = express.Router();

const controlador = require('../controladores/robot'); 
const upload = require('../configuraciones/archivosMultimedia');

router.get('/mostrarPlatillos/page/:id', controlador.obtenerPlatillos); 
router.post('/registrarPlatillo', upload, controlador.insertarPlatillo); 
router.post('/modificarPlatillo/:id', upload, controlador.modificarPlatillo); 
router.delete('/eliminarPlatillo/:id', controlador.eliminarPlatillo); 

module.exports = router;
