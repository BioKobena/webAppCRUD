const express = require("express");

const app = express();

const mongoose = require("mongoose");

//Models that use the mongoose module to manage the database connection
const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://paulbio:BioKobena.@testapi.pkck292.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Get all the members of the group and their members from the database

app.get("/api/products/", (req, res, next) => {
  Product.find()
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/products/:id", (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(404).json({ err }));
});

app.post("/api/products/", (req, res, next) => {
  delete req.body._id;
  const product = new Product({
    "name": String,
    "description": String,
    "price": Number,
    "inStock": Boolean
});

  product
    .save()
    .then((product) => res.status(201).json({ product}))
    .catch((error) => res.status(404).json({ error }));
});

app.put("/api/products/:id", (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then((product) => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/products/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(404).json({ error }));
});

module.exports = app;
