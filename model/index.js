const util = require("../utility");

exports.currencyModel = (currencies) => {
  const allCurrencies = [...currencies[0]];
  const allowedCcyCount = 10 - allCurrencies.length;

  // Allow only first ten currencies to display at a time
  let count = 0;
  [...currencies[1]].map((item) => {
    if (count >= allowedCcyCount) return;
    allCurrencies.push(item);
    count++;
  });

  return `
    const [create, appendInto] = [${util.create}, ${util.appendInto}];
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
        const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
        const title = create("h1", "Tasks", "text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "UI/UX");
        const linkTask2 = create("a", "Website Scraping");

        linkTask1.setAttribute('href', '/task1');
        linkTask2.setAttribute('href', '/task2');
        setAttr([linkTask1, linkTask2], { 'class': 'mainNav btn btn-custom me-2 mb-2 p-2'});

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
        const [create, appendInto, setAttr, createLabel] = [${util.create}, ${util.appendInto}, ${util.setAttr}, ${util.createLabel}];
        const title1 = create("span", "Sila pilih perkhidmatan", "title fw-bold d-flex justify-content-center text-light mb-2");
        const title2 = create("span", "Please select a service", "title d-flex justify-content-center text-light mb-5");
        const linkWrapper = create("div", null, "text-center");

        // button labels
        const label1 = createLabel("Pascabayar", "Postpaid");
        const label2 = createLabel("Peranti Rumah", "Home Fibre");
        const label3 = createLabel("Tawaran Korporat", "Corporate Deals");
        const label4 = createLabel("Perkhidmatan lain-lain", "Other Services");
        const [linkTask1, linkTask2, linkTask3, linkTask4] = [create("a"), create("a"), create("a"), create("a")];
        
        setAttr([linkTask1, linkTask2, linkTask3, linkTask4], {
            'href': '/task1/screen2',
            'class': 'mainNav btn btn-custom text-center p-2 mb-4'
        })

        appendInto(linkTask1, [
            label1,
        ]);
        appendInto(linkTask2, [
            label2,
        ]);
        appendInto(linkTask3, [
            label3,
        ]);
        appendInto(linkTask4, [
            label4,
        ]);
        appendInto(linkWrapper, [
            linkTask1,
            create("br"),
            linkTask2,
            create("br"),
            linkTask3,
            create("br"),
            linkTask4,
        ]);
        appendInto(body, [
            title1,
            title2,
            linkWrapper
        ]);
    `;
};

exports.screen2Model = () => {
  return `
        const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
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
        const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
        const title1 = create("h1", "Terima Kasih", "title text-custom bold text-center mb-3");
        const title2 = create("h1", "Thank You", "title text-custom text-center mb-3");
        appendInto(body, [
            title1,
            title2
        ]);
    `;
};

exports.notFoundModel = () => {
  return `
        const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
        const title = create("h1", "404: Not Found", "title text-center text-light mb-3");
        const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
        const linkTask1 = create("a", "&#x25c0; Back to Homepage");

        setAttr([linkTask1], {
            'href': '/',
            'class': 'mainNav btn btn-custom me-2 mb-2 p-2'
        });

        appendInto(linkWrapper, [
            linkTask1,
        ]);
        appendInto(body, [
            title,
            linkWrapper
        ]);
    `;
};
