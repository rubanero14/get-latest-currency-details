const style = require("./styles").styles;
/**
 * Returns a customizable HTML5 template
 *
 * @param {Object} body - Template literal string of JS scripts
 * @param {number} title - Title of this page
 * @returns {string} Template literal string of JavaScript code for injecting Client-side scripts
 */
exports.template = (body = "", title = "") => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
            ${style}
        </style>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </head>
    <body class="body d-flex align-items-center justify-content-center px-3 py-5">
    <main></main>
    </body>
    <script>
        const body = document.querySelector('main');
        ${body}
    </script>
    </html>
`;
