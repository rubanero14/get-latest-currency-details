const playwright = require("playwright");
/**
 * Scrapes and compiles currency data from source.
 *
 * @returns {Object} An object with list of currency data
 */
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

/**
 * Creates and returns an HTML element
 *
 * @param {string} ele - The HTML element tag name to be created
 * @param {Object} value - The inner HTML for the element created
 * @param {string} classes - String containing classes for the element created
 * @returns {HTMLElement} The created HTML element
 */
exports.create = (ele, value = null, classes = "") => {
  const el = document.createElement(ele);
  el.setAttribute("class", classes);
  if (value !== null) {
    el.innerHTML = value;
  }
  return el;
};

/**
 * Appends multiple children HTML elements into a single main parent
 *
 * @param {HTMLElement} main - The parent HTML element
 * @param {HTMLElement[]} children - List of children HTML elements to be appended into main
 */
exports.appendInto = (main, children = []) => {
  for (const child of children) {
    main.appendChild(child);
  }
};

/**
 * Sets multiple attributes to a list of HTML elements
 *
 * @param {HTMLElement[]} els - A list of HTML elements
 * @param {Object} attrs - An object of attributes
 */
exports.setAttr = (els = [], attrs = {}) =>
  els.forEach((el) => {
    for (const attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }
  });

/**
 * Returns a span HTML element with labels in English and Malay language
 *
 * @param {string} malay - Label in Malay
 * @param {string} english - Label in English
 * @param {string} classes - A string of class names for the label
 * @returns {HTMLElement} The created span HTML element
 */
exports.createLabel = (malay, english, classes = "title mb-2") =>
  create(
    "span",
    `
  <b class="text-center">${malay}</b>
  <br />
  <span class="text-center">${english}</span>
`,
    classes
  );

/**
 * Returns a select HTML element with list of options generated from values passed
 *
 * @param {string} values - List of option values
 * @param {string} placeholder - Placeholder text
 * @returns {HTMLElement} The created select HTML element
 */
exports.createSelect = (values = [], placeholder = "") => {
  const select = document.createElement("select");
  for (const value of values) {
    const optionEle = create("option");
    optionEle.textContent = value === null ? placeholder : value;
    select.appendChild(optionEle);
    optionEle.setAttribute("value", value === null ? "" : value);
  }
  return select;
};

/**
 * Returns a string of scripts for Bootstrap Forms validation
 *
 * @returns {string} The string of scripts for Bootstrap Forms validation
 */
exports.bootstrapFormValidation = () => `
(() => {
    "use strict";
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
})()`;
