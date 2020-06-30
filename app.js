const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const viewsPath = path.join(__dirname, "templates/views");
const partialsPath = path.join(__dirname, "../webserver/templates/partials");
const forecast = require("./source/forecast/forecast");
const geocode = require("./source/utils/geocode");
const request = require("request");
const hbs = require("hbs");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static("public"));

console.log(path.join(__dirname, "templates/views"))

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Home Page",
    name: "Hazrul",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Hazrul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Hazrul",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Provide a search term for weather",
    });
  }

  if (req.query.location == undefined) {
    console.log("Please provide a country");
  } else {
    geocode(req.query.location, (error, {
      lat,
      lon,
      loca
    } = {}) => {
      if (error == "Error") {
        res.send({
          error: "API error",
        });
      } else if (error == "City") {
        res.send({
          error: "Country error",
        });
      } else if (error == "search") {
        res.send({
          error: "Send a valid location",
        });
      } else {
        console.log(lat, lon, loca);
      }
      forecast(lat, lon, (error, {
        cloud,
        type
      } = {}) => {
        if (error == "Country") {
          res.send({
            error: "Country invalid",
          });
        } else if (error == "API") {
          res.send({
            error: "API Invalid",
          });
        } else {
          res.render("weather", {
            title: "Weather",
            location: loca,
            cloud: cloud,
            type: type,
            name: "Hazrul",
          });
        }
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Provide a search term",
    });
  }
  console.log(req.query.search);
  return res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorHelp", {
    title1: "Error 404",
    sub: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title1: "Error 404",
    sub: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Running server " + port);
});