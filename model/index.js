const util = require("../utility");

exports.currencyModel = (currencies) => {
  const mainCurrencies = [...currencies[0]];
  const exoticCurrencies = [...currencies[1]];
  const allCurrencies = [...mainCurrencies];
  const allowedCcy = 10 - mainCurrencies.length;

  let ccyCount = 1;

  exoticCurrencies.map((item) => {
    if (ccyCount <= allowedCcy) {
      allCurrencies.push(item);
    }
  });

  return `
    const create = ${util.create};
    const appendInto = ${util.appendInto};
    const body = document.querySelector('.container');
    const table = create("table", null, "table table-light table-bordered table-hover");
    const tableWrapper = create("div", null, "table-responsive");
    
    // Last Updated
    const log = create("span", "Last Update: " + new Date(Date.now()).toUTCString(),"text-secondary log d-flex justify-content-end mb-3");

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

    ${JSON.stringify(allCurrencies)}.map(currency => {
        if(count > 10) return; 
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
    });

    appendInto(table, [
        header,
        tableBody
        ]);
        appendInto(tableWrapper, [
        table,
        ]);
        appendInto(body, [
        log,
        tableWrapper,
    ]);

    setInterval(() => {
        location.reload();
    }, 60000 * 60);`;
};
