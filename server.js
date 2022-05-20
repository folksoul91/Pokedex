const express = require("express");
const app = express();
const PORT = 3000;

const pokemon = require("./models/pokemon");

// Middlewares
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Index route
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { pokeData: pokemon });
});

//Delete route
app.delete("/pokemon/:indexOfPokemonArray", (req, res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1);
  res.redirect("/pokemon");
});

//Edit route
app.get("/pokemon/:indexOfPokemonArray/edit", (req, res) => {
  res.render("edit.ejs", {
    pokedex: pokemon[req.params.indexOfPokemonArray],
    index: req.params.indexOfPokemonArray,
  });
});
//Update route
app.put("/pokemon/:indexOfPokemonArray", (req, res) => {
  const updatePokemon = {
    img: "https://cdn-icons-png.flaticon.com/512/528/528101.png",
    name: req.body.name,
    type: req.body.type,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
    },
  };
  pokemon[req.params.indexOfPokemonArray] = updatePokemon;
  res.redirect("/pokemon");
});

// New route
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});
//Create route
app.post("/pokemon", (req, res) => {
  const createNewPokemon = {
    img: "https://cdn-icons-png.flaticon.com/512/528/528101.png",
    name: req.body.name,
    type: req.body.type,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
    },
  };
  pokemon.push(createNewPokemon);
  res.redirect("/pokemon");
});

//Show route
app.get("/pokemon/:id", (req, res) => {
  res.render("show.ejs", { poke: pokemon[req.params.id] });
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
