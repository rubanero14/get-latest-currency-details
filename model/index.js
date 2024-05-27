const util = require("../utility");

exports.currencyModel = (currencies) => {
  const mainCurrencies = [...currencies[0]];
  const exoticCurrencies = [...currencies[1]];
  const allCurrencies = [...mainCurrencies];
  const allowedCcy = 10 - mainCurrencies.length;

  // Allow only first ten currencies to display at a time
  let ccyCount = 0;
  exoticCurrencies.map((item) => {
    if (ccyCount >= allowedCcy) return;
    allCurrencies.push(item);
    ccyCount++;
  });

  return `
    const create = ${util.create};
    const appendInto = ${util.appendInto};
    const table = create("table", null, "table table-warning table-hover table-bordered mb-0");
    const tableWrapper = create("div", null, "table-responsive");
    const linkTask1 = create("a", "&#x25c0; Back to Homepage");

    linkTask1.setAttribute('href', '/');
    linkTask1.setAttribute('class', 'mainNav btn btn-custom mb-2 p-2');
    
    // Last Updated
    const log = create("span", "Last Update: " + new Date(Date.now()).toUTCString(),"text-light log d-flex justify-content-end mb-3");

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
        linkTask1,
        log,
        tableWrapper,
    ]);

    setInterval(() => {
        location.reload();
    }, 60000 * 60);`;
};

exports.homeModel = () => {
  return `
        const create = ${util.create};
        const appendInto = ${util.appendInto};
        const title = create("h1", "Tasks", "text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "UI/UX");
        const linkTask2 = create("a", "Web Scraper");

        linkTask1.setAttribute('href', '/task1');
        linkTask1.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');
        linkTask2.setAttribute('href', '/task2');
        linkTask2.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');

        appendInto(linkWrapper, [
            linkTask1,
            linkTask2
        ]);
        appendInto(body, [
            title,
            linkWrapper
        ]);
    `;
};

exports.screen1Model = () => {
  return `
        const create = ${util.create};
        const appendInto = ${util.appendInto};
        const title = create("h1", "Tasks", "title text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "UI/UX");
        const linkTask2 = create("a", "Web Scraper");

        linkTask1.setAttribute('href', '/task1');
        linkTask1.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');
        linkTask2.setAttribute('href', '/task2');
        linkTask2.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');

        appendInto(linkWrapper, [
            linkTask1,
            linkTask2
        ]);
        appendInto(body, [
            title,
            linkWrapper
        ]);
    `;
};

exports.screen2Model = () => {
  return `
        const create = ${util.create};
        const appendInto = ${util.appendInto};
        const title = create("h1", "Tasks", "title text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "UI/UX");
        const linkTask2 = create("a", "Web Scraper");

        linkTask1.setAttribute('href', '/task1');
        linkTask1.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');
        linkTask2.setAttribute('href', '/task2');
        linkTask2.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');

        appendInto(linkWrapper, [
            linkTask1,
            linkTask2
        ]);
        appendInto(body, [
            title,
            linkWrapper
        ]);
    `;
};

exports.screen6Model = () => {
  return `
        const create = ${util.create};
        const appendInto = ${util.appendInto};
        const title = create("h1", "Tasks", "title text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "UI/UX");
        const linkTask2 = create("a", "Web Scraper");

        linkTask1.setAttribute('href', '/task1');
        linkTask1.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');
        linkTask2.setAttribute('href', '/task2');
        linkTask2.setAttribute('class', 'mainNav btn btn-custom me-2 mb-2 p-2');

        appendInto(linkWrapper, [
            linkTask1,
            linkTask2
        ]);
        appendInto(body, [
            title,
            linkWrapper
        ]);
    `;
};

exports.notFoundModel = () => {
  return `
        const create = ${util.create};
        const appendInto = ${util.appendInto};
        const title = create("h1", "404 Not Found", "title text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "&#x25c0; Back to Homepage");

        linkTask1.setAttribute('href', '/');
        linkTask1.setAttribute('class', 'mainNav btn btn-custom p-2');

        appendInto(linkWrapper, [
            linkTask1,
        ]);
        appendInto(body, [
            title,
            linkWrapper
        ]);
    `;
};
