const PORT = process.env.PORT || 8000;
const express = require("express");
const util = require("./utility");
const currencyTemplate = require("./template");
const currencyModel = require("./model").currencyModel;

const app = express();

app.get("/task1", async (req, res, next) => {
  res.send("Under Construction");
});

app.get("/task2", async (req, res, next) => {
  res.send(
    currencyTemplate.template(
      currencyModel(await util.currencyValueExtractor())
    )
  );
});

app.get("/", async (req, res, next) => {
  res.send("Under Construction");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
