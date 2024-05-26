const playwright = require("playwright");

exports.currencyValueExtractor = async () => {
  const browser = await playwright.chromium.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(
    "https://www.hsbc.com.my/investments/products/foreign-exchange/currency-rate/"
  );

  // Wait for 1 second to ensure page content loads properly
  await page.waitForTimeout(1000);
  const mainCurrencies = "#content_rel_basicTable_1 table",
    exoticCurrencies = "#content_rel_basicTable_2 table";

  const getTableData = async (table) => {
    const data = await page.locator(table).evaluate((ele) => {
      const headers = [...ele.querySelectorAll("thead th")].map(
        (cell) => cell.textContent
      );
      return [...ele.querySelectorAll("tbody tr")].map((row) =>
        Object.fromEntries(
          [...row.querySelectorAll("th"), ...row.querySelectorAll("td")].map(
            (c, idx) => {
              return [headers[idx], c.textContent];
            }
          )
        )
      );
    });

    data.map(
      (e) =>
        (e.flag = `https://flaglog.com/codes/standardized-rectangle-120px/${e.Currency.substring(
          0,
          2
        )}.png`)
    );
    return data;
  };

  return [
    ...(await getTableData(mainCurrencies)),
    ...(await getTableData(exoticCurrencies)),
  ];
};

exports.create = (ele, value = null, classes = "") => {
  const el = document.createElement(ele);
  el.setAttribute("class", classes);
  if (value !== null) {
    el.textContent = value;
  }
  return el;
};

exports.appendInto = (main, children = []) => {
  for (const child of children) {
    main.appendChild(child);
  }
};
