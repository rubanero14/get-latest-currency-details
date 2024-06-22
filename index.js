const PORT = process.env.PORT || 8000;
const express = require("express");
const template = require("./template").template;
const layout = require("./model");
const util = require("./utility");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post("/newsapi/result", async (req, res, next) => {
  const feedType = req.body.feedType;
  const searchOrCategory = req.body.searchQuery
    ? req.body.searchQuery
    : req.body.category;
  const data = await util.fetchNewsAPI(feedType, searchOrCategory);
  res.send(data);
});

app.get("/newsapi/", async (req, res, next) => {
  res.send(`
    <style>
      form {
        padding: 30px;
      }
      select, button, input {
        width: 300px;
      }
    </style>
    <form method="POST" action="/newsapi/result">
      <select name="feedType">
        <option selected disabled>Choose a Feed Type</option>
        <option value="all">Everything</option>
        <option value="top">Headlines</option>
      </select>
      <br/><br/>
      <input placeholder="Search" type="text" name="searchQuery"/>
      <br/><br/>
      <select name="category" class="hidden">
        <option selected disabled>Choose a category</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="general">General</option>
      </select> 
      <br class="hidden"/><br class="hidden"/>
      <button>Submit</button>
    </form>
    <script>
      const type = document.querySelector('[name="feedType"]');
      const category = document.querySelectorAll('.hidden');
      type.addEventListener('change', (e) => {
        if(e.target.value === 'all') {
          category.forEach(cat => cat.style.display = 'none');
        } else {
          category.forEach(cat => cat.style.display = 'block');
        }
      })
    </script>
  `);
});

app.get("/task1/screen1", async (req, res, next) => {
  res.send(template(layout.screen1Model(), "Screen 1"));
});

app.get("/task1/screen2", async (req, res, next) => {
  res.send(template(layout.screen2Model(), "Screen 2"));
});

app.get("/task1/screen6", async (req, res, next) => {
  res.send(template(layout.screen6Model(), "Screen 6"));
});

app.get("/task1/wireframe", async (req, res, next) => {
  res.send(template(layout.wireframeModel(), "Wireframe"));
});

app.get("/task1", async (req, res, next) => {
  res.redirect("/task1/screen1");
});

app.get("/task2", async (req, res, next) => {
  res.send(
    template(await layout.currencyModel(), "Get Latest Currency Values")
  );
});

app.get("/", async (req, res, next) => {
  res.send(template(layout.homeModel(), "Home"));
});

app.get("*", function (req, res) {
  res.status(404).send(template(layout.notFoundModel(), "Not Found"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
