const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()
var morgan = require("morgan");

// Mongoose configuration

const url = process.env.MONGO_URL  // Replace with your MongoDB connection URL
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());

try {
  con.on("open", () => {
    console.log("Connected to the database");
  });
} catch (error) {
  console.log("Error: " + error);
}
// ----------------------------------------------------------------

const port = process.env.PORT 
app.listen(port, () => {
  console.log("listening on port" + port);
});

const userroutes = require("./routes/userRoutes");
app.use('/api/users', userroutes);

const authroutes = require("./routes/authRoutes");
app.use('/api/auth/', authroutes)



// app.get("/", function (req, res) {
//   res.status(300).redirect("/accueil");
// });


// app.get("/accueil", function (req, res) {
//     res.status(200).sendFile("IHM/accueil.html", { root: __dirname });
// });