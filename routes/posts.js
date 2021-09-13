const router = require("express").Router();
const verify = require("./verifyToken");
const client = require("../database");
router.get("/stocks", verify, async (req, res) => {
  try {
    const stocks = await client.query("SELECT name from  stocks ");
    res.send(stocks.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/find-stock", verify, async (req, res) => {
  try {
    const targetStock = await client.query(
      "SELECT * FROM stocks WHERE name =" + "'" + [req.body.data] + "'"
    );
    res.send(targetStock.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
