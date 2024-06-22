const PORT = process.env.PORT || 8000;
const express = require("express");
const template = require("./template").template;
const layout = require("./model");
const util = require("./utility");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post("/newsapi/result", async (req, res, next) => {
  const feedType = req.body.feedType;
  const searchOrCategory = req.body.searchQuery
    ? req.body.searchQuery
    : req.body.category;
  const data = await util.fetchNewsAPI(feedType, searchOrCategory);
  res.send(data);
});

app.get("/newsapi/", async (req, res, next) => {
  res.send(layout.newsAPIModel(), "News API");
});

app.get("/task1/screen1", async (req, res, next) => {
  res.send(template(layout.screen1Model(), "Screen 1"));
});

app.get("/task1/screen2", async (req, res, next) => {
  res.send(template(layout.screen2Model(), "Screen 2"));
});

app.get("/task1/screen6", async (req, res, next) => {
  res.send(template(layout.screen6Model(), "Screen 6"));
});

app.get("/task1/wireframe", async (req, res, next) => {
  res.send(template(layout.wireframeModel(), "Wireframe"));
});

app.get("/task1", async (req, res, next) => {
  res.redirect("/task1/screen1");
});

app.get("/task2", async (req, res, next) => {
  res.send(
    template(await layout.currencyModel(), "Get Latest Currency Values")
  );
});

app.get("/", async (req, res, next) => {
  res.send(template(layout.homeModel(), "Home"));
});

app.get("*", function (req, res) {
  res.status(404).send(template(layout.notFoundModel(), "Not Found"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
