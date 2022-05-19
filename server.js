const express = require("express");
const app = express();
const PORT = 3000;

const pokemon = require("./models/pokemon");

// Middlewares
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// INDEX
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { data: pokemon });
});

// N
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});
//D

//U

//C

//E
app.get("/pokemon/:indexOfPokemonArray/edit", (req, res) => {
  res.render("edit.ejs", {
    pokesingle: pokemon[req.params.indexOfPokemonArray],
    index: req.params.indexOfPokemonArray,
  });
});
//S
app.get("/pokemon/:id", (req, res) => {
  res.render("show.ejs", { poke: pokemon[req.params.id] });
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
