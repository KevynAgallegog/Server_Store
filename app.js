const express = require('express');
const bodyParser = require('body-parser');
const validateToken = require('./routes/GetAuthentication');
const AddProduct = require('./routes/AddProduct');
const UpdateProduct = require('./routes/UpdateProduct');
const DeleteProduct = require('./routes/DeleteProduct');
const ShowUser = require('./routes/ShowUser');
const products = require('./routes/ProductList');;
const Register = require('./routes/Register');
const buyProduct = require('./routes/BuyProduct');
const auth = require('./routes/GetJwt');
const signingKey = require('./config/keys');
const cookieParser = require('cookie-parser');

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(signingKey.SIGNING_KEY_COOKIE));

let port = 5000;

app.use('/buyProduct', buyProduct);
app.use('/ShowUser', ShowUser);
app.use('/Register', Register);
app.use('/DeleteProduct', DeleteProduct);
app.use('/UpdateProduct', UpdateProduct);
app.use('/auth', auth);
app.use('/products', products);
app.use('/readToken', validateToken);
app.use('/AddProduct', AddProduct);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});






