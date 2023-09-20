const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin')


// Ruta para agregar un producto. Requiere autenticación JWT de administrador.
router.post('/',ValidateAdmin.njwtAuth, productController.AgregarProd );

module.exports = router; 