const mysql = require("mysql2");
const User = require("../models/user");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1091205488Kg",
  database: "tiendita",
});

db.connect();

class UserRepository {
  static addUser(id, name, email, password) {
    const query =
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
    db.query(query, [id, name, email, password], (err, result) => {
      if (err) {
        console.error("Error registering user: " + err.message);
        return false;
      } else {
        console.log("User registered successfully");
        return true;
      }
    });
  }

  static makePurchase(userId, productId, quantity, callback) {
    const query =
      "INSERT INTO purchases (user_id, product_id, quantity) VALUES (?, ?, ?)";
    db.query(query, [userId, productId, quantity], (err, result) => {
      if (err) {
        console.error("Error making the purchase: " + err.message);
        callback();
        return false;
      } else {
        console.log("Purchase made successfully");
        callback();
        return true;
      }
    });
  }

  static getUserInformation(userId, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error getting user information: ' + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null);
      } else {
        const user = result[0];
        callback(null, user);
      }
    });
    
  }

}

module.exports = UserRepository;
