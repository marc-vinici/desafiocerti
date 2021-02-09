const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const routes = require("./routes");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
