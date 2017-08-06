//npm packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//calls the express application and puts the express application inside the app variable
var app = express();

//middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//serves static files 
app.use(express.static("app"));

require("./app/routing/api-routes")(app);
require("./app/routing/html-routes")(app);

app.listen(process.env.PORT || 3000);
