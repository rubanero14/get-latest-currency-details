const PORT = process.env.PORT || 8000;
const express = require("express");
const util = require("./utility/util");
const currencyTemplate = require("./templates/templates");

const app = express();

app.get("/task1", async (req, res, next) => {
  res.send("Under Construction");
});

app.get("/task2", async (req, res, next) => {
  const currencies = JSON.stringify(await util.currencyValueExtractor());
  const code = `
    const currencies = ${currencies}
    const create = ${util.create};
    const appendInto = ${util.appendInto};
    const body = document.querySelector('.container');
    const table = create("table", null, "table table-light table-bordered table-hover");
    
    // Last Updated
    const log = create("span", "Last Update: " + new Date(Date.now()).toUTCString(),"log d-flex justify-content-end mb-3");

    // Table Header
    const headerRow = create("tr");
    const header = create("thead");
    const currencyHeader = create("th", "Currency");
    const currencyNameHeader = create("th", "Currency Name");
    const countryFlagHeader = create("th", "Country");
    const sellHeader = create("th", "TT Sell");
    const buyHeader = create("th", "TT Buy");

    appendInto(headerRow, [
      currencyHeader,
      currencyNameHeader,
      countryFlagHeader,
      sellHeader,
      buyHeader,
    ]);
    appendInto(header, [
      headerRow
    ]);

    // Table Body
    const tableBody = create("tbody");
    let count = 0;
    currencies.map(currency => {
      // if(count > 10) return; 
      const bodyRow = create("tr");
      const currencyBody = create("td", currency.Currency);
      const currencyNameBody = create("td", currency["Currency Name"]);
      const countryFlagBody = create("td");
      const countryFlag = create("img", null, "flag");
      countryFlag.setAttribute('src', currency.flag);
      const buyBody = create("td", currency["TT Buy"]);
      const sellBody = create("td", currency["TT Sell"]);

      appendInto(countryFlagBody, [
        countryFlag
      ]);
      appendInto(bodyRow, [
        currencyBody,
        currencyNameBody,
        countryFlagBody,
        buyBody,
        sellBody,
      ]);
      appendInto(tableBody, [
        bodyRow
      ]);
      count++;
    })

    appendInto(table, [
      header,
      tableBody
    ]);
    appendInto(body, [
      log,
      table,
    ]);

    setInterval(() => {
      location.reload();
    }, 60000 * 60);
  `;
  res.send(currencyTemplate.template(code));
});

app.get("/", async (req, res, next) => {
  res.send("Under Construction");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
