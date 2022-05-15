//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

let items = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get("/", function (req, res) {

  let day = date.getDate();

  res.render("list", { kindOfDay: day, newListItem: items });
});

app.post("/", function (req, res) {
  if (req.body.button === "add") {
    let item = req.body.newItem;
    items.push(item);
    console.log(item);
  }
  else {
    items.pop();
  }

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("running on port");
});
