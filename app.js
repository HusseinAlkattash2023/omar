const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const path = require("path");
const multer = require("multer");
const body_parser = require("body-parser");

const authRoute = require('./routes/auth');
const authUser = require('./routes/user');
const authProduct = require('./routes/products');
require('dotenv').config();


const app = express();


app.use(body_parser.json());

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));


mongoose.connect(process.env.MONGO_URI)
.then(()=> app.listen(5000 , () => console.log(`Server running no port:${5000}`)))
.catch((error)=> console.log(error.message))


app.use("/auth" , authRoute);
app.use("/user" , authUser);
app.use("/products" , authProduct);

