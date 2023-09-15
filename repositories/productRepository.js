const mysql = require("mysql2");
const Product = require("../models/product");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1091205488Kg",
  database: "tiendita",
});

connection.connect();

class ProductRepository {
  static getAllProducts(callback) {
    connection.query("SELECT * FROM products", (error, results) => {
      if (error) throw error;

      const products = results.map(
        (row) => new Product(row.id, row.name, row.description, row.price, row.stock)
      );
      callback(products);
    });
  }

  static getProductById(id, callback) {
    connection.query(
      "SELECT * FROM products WHERE id = ?",
      [id],
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          const productData = results[0];
          const product = new Product(
            productData.id,
            productData.name,
            productData.description,
            productData.price,
            productData.stock
          );
          callback(product);
        } else {
          callback(null);
        }
      }
    );
  }

  static addNewProduct(product, callback) {
    connection.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [
        product.name,
        product.description,
        product.price,
        product.stock,
      ],
      (error, results) => {
        if (error) throw error;

        const newProductId = results.insertId;
        callback(newProductId);
      }
    );
  }

  static  updateProduct(product, callback) {
    connection.query(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [product.name, product.description, product.price, product.stock, product.id],
      (error) => {
        if (error) throw error;

        callback();
      }
    );
  }

  static deleteProduct(id, callback) {
    connection.query("DELETE FROM products WHERE id = ?", [id], (error) => {
      if (error) throw error;

      callback();
    });
  }
}

module.exports = ProductRepository;
