const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Middleware setup
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Routes
const routes = require("./routes/allRoutes");
const addUserRoutes = require("./routes/addUser");
app.use(routes);
app.use(addUserRoutes);
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ahmedmoawad550:Aldx53hNCIe5sygF@cluster0.pqmaz.mongodb.net/EmployeesDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
