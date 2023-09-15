const ProductRepository = require("../repositories/productRepository");
const UserRepository = require("../repositories/userRepository");
const ValidateAdmin = require('../middleware/ValidateAdmin');

let ObtenerProds = (req, res) => {
  ProductRepository.getAllProducts((products) => {
    res.status(200).json(products);
  });
};

let AgregarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req, res, null)
  ProductRepository.addNewProduct(req.body, () => {
    res.status(200).json({
      message: "Producto registrado correctamente",
    });
  });
};

let ActualizarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req, res, null)
  ProductRepository.updateProduct(req.body, () => {
    res.status(200).json({
      message: "Producto actualizado correctamente",
    });
  });
};

let eliminarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req, res, null)
  ProductRepository.deleteProduct(req.query.id, () => {
    res.status(200).json({
      message: "Producto eliminado correctamente",
    });
  });
};

let comprarProducto = (req, res) => {
  const usuarioId = req.body.usuarioId;
  const productoId = req.body.productoId;
  const cantidad = req.body.cantidad;

  UserRepository.makePurchase(usuarioId, productoId, cantidad, () => {
    res.status(200).json({
      message: "Compra realizada con éxito",
    });
  });
};

module.exports = {
  ObtenerProds,
  AgregarProd,
  ActualizarProd,
  eliminarProd,
  comprarProducto
};
