const PORT = process.env.PORT || 8000;
const express = require("express");
const util = require("./utility");
const template = require("./template").template;
const layout = require("./model");

const app = express();

app.get("/task1/screen1", async (req, res, next) => {
  res.send(template(layout.screen1Model(), "Screen 1"));
});

app.get("/task1/screen2", async (req, res, next) => {
  res.send(template(layout.screen2Model(), "Screen 2"));
});

app.get("/task1/screen6", async (req, res, next) => {
  res.send(template(layout.screen6Model(), "Screen 6"));
});

app.get("/task1", async (req, res, next) => {
  res.redirect("/task1/screen1");
});

app.get("/task2", async (req, res, next) => {
  res.send(
    template(
      layout.currencyModel(await util.currencyValueExtractor()),
      "Get Latest Currency Values"
    )
  );
});

app.get("/", async (req, res, next) => {
  res.send(template(layout.homeModel(), "Home"));
});

app.get("*", function (req, res) {
  res.status(404).send(template(layout.notFoundModel(), "404: Not Found"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
