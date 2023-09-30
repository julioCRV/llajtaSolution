const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler'); 

const controlador = require('../controladores/robot'); 
const pool = require('../configuraciones/database');
const upload = require('../configuraciones/archivosMultimedia');

router.get('/mostrarPlatillos/page/:id', controlador.obtenerPlatillos); 
router.post('/registrarPlatillo', upload.fields([
  {name: 'imagenPlatillo', maxCount: 1 }, 
  {name: 'videoPlatillo' , maxCount: 1 }
]),controlador.insertarPlatillo); 
router.post('/modificarPlatillo/:id', controlador.modificarPlatillo); 
router.delete('/eliminarPlatillo/:id', controlador.eliminarPlatillo); 

router.get('/datos', async (req, res) => {
  try {
    const sql = 'SELECT * FROM \`administrador\`'; 
    const [results] = await pool.query(sql); 
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/prueba', async (req, res) => {
  const {nombre, passwd} = req.body;
  const sql = `INSERT INTO \`administrador\` (\`ID_ADMINISTRADOR\`, 
  \`NOMBRE_ADMIN\`, \`CONTRASENIA_ADMIN\`) VALUES (NULL, ?, ?)`;

  try {
    const result =await pool.query(sql, [nombre, passwd]); 
    res.status(200).json({message: 'Exitos'}); 
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
