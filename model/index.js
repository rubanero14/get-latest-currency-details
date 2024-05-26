const util = require("../utility");

exports.currencyModel = (currencies) => {
  const mainCurrencies = [...currencies[0]];
  const exoticCurrencies = [...currencies[1]];
  const allCurrencies = [...mainCurrencies];
  const allowedCcy = 10 - mainCurrencies.length;

  let ccyCount = 0;

  exoticCurrencies.map((item) => {
    if (ccyCount >= allowedCcy) return;
    allCurrencies.push(item);
    ccyCount++;
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
    const currencyNameHeader = create("th", "Country Name");
    const countryFlagHeader = create("th", "Country Flag");
    const buyHeader = create("th", "Buy Rate");
    const sellHeader = create("th", "Sell Rate");

    appendInto(headerRow, [
        currencyNameHeader,
        countryFlagHeader,
        buyHeader,
        sellHeader,
    ]);
    appendInto(header, [
        headerRow
    ]);

    // Table Body
    const tableBody = create("tbody");
    let count = 0;

    ${JSON.stringify(allCurrencies)}.map(currency => {
        if(count > 10) return;
        const formattedCountryName = currency["Currency Name"]
            .replace("Chinese","China")
            .replace("Australian","Australia")
            .replace("Canadian","Canada")
            .replace("Swiss","Switzerland")
            .replace("US","United States")
            .replace("Pound Sterling","Britain")
            .replace("UAE","United Arab Emirates")
            .replace("The Euro","European Union")
            .replace(" Dirham","")
            .replace(" Franc","")
            .replace(" Dollar","")
            .replace(" Renminbi","");
            
        const bodyRow = create("tr");
        const countryNameBody = create("td", formattedCountryName);
        const countryFlagBody = create("td");
        const countryFlag = create("img", null, "flag");
        countryFlag.setAttribute('src', currency.flag);
        const buyBody = create("td", currency["TT Buy"]);
        const sellBody = create("td", currency["TT Sell"]);

        appendInto(countryFlagBody, [
            countryFlag
        ]);
        appendInto(bodyRow, [
            countryNameBody,
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
