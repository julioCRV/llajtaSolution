const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler'); 

const controlador = require('../controladores/robot'); 
const pool = require('../configuraciones/database');

router.get('/mostrarPlatillos/page/:id', controlador.obtenerPlatillos); 
router.post('/registrarPlatillo',controlador.insertarPlatillo); 
router.put('/modificarPlatillo/:id', controlador.modificarPlatillo); 
router.delete('/eliminarPlatillo/:id', controlador.eliminarPlatillo); 

module.exports = router;
