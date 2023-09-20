const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin')

// Ruta para actualizar un producto. Requiere autenticación JWT de administrador.
router.post('/',ValidateAdmin.njwtAuth, productController.ActualizarProd);


module.exports = router; 