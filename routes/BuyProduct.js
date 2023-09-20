const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin')
// Ruta para realizar la compra de un producto. Requiere autenticación JWT de administrador.
router.post('/',ValidateAdmin.njwtAuth, productController.comprarProducto);


module.exports = router; 