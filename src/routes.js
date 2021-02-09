const routes = require("express").Router();
const TranslateController = require("./controllers/TranslateController");

routes.get("/:num", TranslateController.translate);

routes.get("/", (req, res) => {
  return res.status(400).json({ error: "Invalid Entry" });
});

module.exports = routes;
