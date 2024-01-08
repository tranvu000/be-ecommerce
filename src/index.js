const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());  //như là 1 chính sách bảo mật của trình duyệt web, để tránh mình truy cập vào các dolement khác nhau thì sinh ra cors này. khai báo để tránh lỗi đó
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log('Connect DB success!');
  })
  .catch((err) => {
    console.log(err);
  })

app.listen(port, () => {
  console.log('Server is running in port: ', port);
});