const express = require('express');
const registerController = require('../controllers/register-controller');
const router = express.Router()
const ValidateAdmin = require('../middleware/ValidateAdmin')

// Ruta para mostrar el perfil de usuario.
router.get('/',ValidateAdmin.njwtAuth, registerController.verPerfilUsuario);


module.exports = router; 