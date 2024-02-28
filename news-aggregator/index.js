const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const newsRoutes = require("./routes");
const dotenv = require('dotenv');
const { ENVConfig,LoggerConfig, DBConfig } = require("./config");
//const user = require("./models/user");

/* configurations */
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('./api',newsRoutes);

app.get('./', function(req,res){
      return res.status(200).send('application is working fine');
});

app.listen(ENVConfig.PORT, () => {
      console.log(`Serving at http://localhost:${ENVConfig.PORT}`);
      LoggerConfig.info("Successfully started server", {});
      DBConfig.connect();
      console.log('Press Ctrl+C to quit.');
  });
  
  module.exports = app;