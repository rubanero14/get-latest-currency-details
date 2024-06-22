const playwright = require("playwright");
const axios = require("axios");

// Environment Variables config enablement
require("dotenv").config();

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

/**
 * Returns a Object of mock currency data for web scraping page
 *
 * @returns {Object} The Object of mock currency data
 */
exports.mockData = [
  {
    Currency: "USD",
    "Currency Name": "US Dollar",
    "TT Sell": "4.7912",
    "TT Buy": "4.6218",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/US.png",
  },
  {
    Currency: "SGD",
    "Currency Name": "Singapore Dollar",
    "TT Sell": "3.5631",
    "TT Buy": "3.4186",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/SG.png",
  },
  {
    Currency: "NZD",
    "Currency Name": "New Zealand Dollar",
    "TT Sell": "2.9894",
    "TT Buy": "2.8311",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/NZ.png",
  },
  {
    Currency: "GBP",
    "Currency Name": "Pound Sterling",
    "TT Sell": "6.1340",
    "TT Buy": "5.9100",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/GB.png",
  },
  {
    Currency: "EUR",
    "Currency Name": "The Euro",
    "TT Sell": "5.1925",
    "TT Buy": "4.9859",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/EU.png",
  },
  {
    Currency: "CAD",
    "Currency Name": "Canadian Dollar",
    "TT Sell": "3.5021",
    "TT Buy": "3.3553",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/CA.png",
  },
  {
    Currency: "BND",
    "Currency Name": "Brunei Dollar",
    "TT Sell": "3.5664",
    "TT Buy": "3.4156",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/BN.png",
  },
  {
    Currency: "AUD",
    "Currency Name": "Australian Dollar",
    "TT Sell": "3.2167",
    "TT Buy": "3.0542",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/AU.png",
  },
  {
    Currency: "AED",
    "Currency Name": "UAE Dirham",
    "TT Sell": "133.2600",
    "TT Buy": "123.0100",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/AE.png",
  },
  {
    Currency: "CHF",
    "Currency Name": "Swiss Franc",
    "TT Sell": "535.9000",
    "TT Buy": "517.1600",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/CH.png",
  },
  {
    Currency: "CNY",
    "Currency Name": "Chinese Renminbi",
    "TT Sell": "66.0900",
    "TT Buy": "63.5000",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/CN.png",
  },
  {
    Currency: "DKK",
    "Currency Name": "Danish Kroner",
    "TT Sell": "70.9500",
    "TT Buy": "65.4900",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/DK.png",
  },
  {
    Currency: "HKD",
    "Currency Name": "Hong Kong Dollar",
    "TT Sell": "61.9600",
    "TT Buy": "58.6000",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/HK.png",
  },
  {
    Currency: "IDR",
    "Currency Name": "Indonesian Rupiah",
    "TT Sell": "0.0300",
    "TT Buy": "0.0000",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/ID.png",
  },
  {
    Currency: "PHP",
    "Currency Name": "Philippine Peso",
    "TT Sell": "8.3400",
    "TT Buy": "0.0000",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/PH.png",
  },
  {
    Currency: "INR",
    "Currency Name": "Indian Rupee",
    "TT Sell": "5.8640",
    "TT Buy": "0.0000",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/IN.png",
  },
  {
    Currency: "JPY",
    "Currency Name": "Japanese Yen",
    "TT Sell": "3.0730",
    "TT Buy": "2.9300",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/JP.png",
  },
  {
    Currency: "LKR",
    "Currency Name": "Sri Lanka Rupee",
    "TT Sell": "1.6090",
    "TT Buy": "0.0000",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/LK.png",
  },
  {
    Currency: "NOK",
    "Currency Name": "Norwegian Kroner",
    "TT Sell": "46.2800",
    "TT Buy": "42.7200",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/NO.png",
  },
  {
    Currency: "SAR",
    "Currency Name": "Saudi Arabia Riyal",
    "TT Sell": "129.6800",
    "TT Buy": "121.2300",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/SA.png",
  },
  {
    Currency: "SEK",
    "Currency Name": "Swedish Kroner",
    "TT Sell": "47.1300",
    "TT Buy": "43.5100",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/SE.png",
  },
  {
    Currency: "THB",
    "Currency Name": "Thai Baht",
    "TT Sell": "13.3910",
    "TT Buy": "12.3610",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/TH.png",
  },
  {
    Currency: "ZAR",
    "Currency Name": "South African Rand",
    "TT Sell": "26.6200",
    "TT Buy": "24.5800",
    flag: "https://flaglog.com/codes/standardized-rectangle-120px/ZA.png",
  },
];

/**
 * Makes API call to News API and returns data
 *
 * @returns {Object} The Object of news data
 */
exports.fetchNewsAPI = async (opt = "all", searchQueryOrcategory = "my") => {
  let url, data;
  switch (opt) {
    case "top":
      url = `https://newsapi.org/v2/top-headlines?category=${searchQueryOrcategory}&country=us&apiKey=${process.env.APIKEY}`;
      break;
    case "all":
    default:
      url = `https://newsapi.org/v2/everything?q=${searchQueryOrcategory}&apiKey=${process.env.APIKEY}`;
  }

  await axios
    .get(url)
    .then((res) => (data = res.data.articles))
    .catch((err) => console.log(err));

  return data;
};
