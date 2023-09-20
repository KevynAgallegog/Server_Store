const ProductRepository = require("../repositories/productRepository");
const UserRepository = require("../repositories/userRepository");
const ValidateAdmin = require('../middleware/ValidateAdmin');
const Product = require("../models/product");

let ObtenerProds = (req, res) => {
  ProductRepository.getAllProducts((products) => {
    res.status(200).json(products);
  });
};

let AgregarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req, res, null)
  let product = new Product(req.body.id,req.body.name,req.body.price)
  ProductRepository.addNewProduct(product, () => {
    res.status(200).json({
      message: "Producto registrado correctamente",
    });
  });
  
};

let ActualizarProd = (req, res) => {
  ValidateAdmin.njwtAuth(req, res, null)
  let product1 = new Product(req.body.id,req.body.name,req.body.price)
  ProductRepository.updateProduct(product1, () => {
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
