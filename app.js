const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()
var morgan = require("morgan");


const url = process.env.MONGO_URL;
mongoose.connect(url, {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


app.use(express.json());
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT 
app.listen(port, () => {
  console.log("listening on port" + port);
});

const userroutes = require("./routes/userRoutes");
app.use('/api/users', userroutes);

const authroutes = require("./routes/authRoutes");
app.use('/api/auth/', authroutes)

const moutonroutes = require("./routes/moutonRoutes");
app.use('/api/moutons/', moutonroutes)

const categoryroutes = require("./routes/categoryRoutes");
app.use('/api/category/', categoryroutes)
