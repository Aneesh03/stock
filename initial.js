const csv = require("csvtojson");
const client = require("./database");
const initial = async () => {
  try {
    var a = await client.query("select * from stocks");
  } catch {
    await client.query(
      "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(30),email VARCHAR(30),password VARCHAR(250))"
    );
    await client.query(
      "CREATE TABLE stocks (id SERIAL PRIMARY KEY, name VARCHAR(30),CurrentMarketPrice numeric,\
      MarketCap numeric, StockPE  numeric, DividendYield numeric, ROCE numeric,ROEPreviousAnnum numeric,DebttoEquity numeric,\
    EPS numeric,Reserves numeric ,Debt numeric)"
    );
    await csv()
      .fromFile("./files/stocks.csv")
      .then((jsonObj) => {
        for (i = 0; i < jsonObj.length; i++) {
          async function writeToDatabase() {
            await client.query(
              "INSERT INTO stocks (name ,CurrentMarketPrice,MarketCap, StockPE, DividendYield , ROCE ,ROEPreviousAnnum,DebttoEquity ,EPS ,Reserves ,Debt) VALUES (" +
                "'" +
                [
                  jsonObj[i].Name,
                  jsonObj[i]["Current Market Price"],
                  jsonObj[i]["Market Cap"],
                  jsonObj[i]["Stock P/E"],
                  jsonObj[i]["Dividend Yield"],
                  jsonObj[i]["ROCE %"],
                  jsonObj[i]["ROE Previous Annum"],
                  jsonObj[i]["Debt"],
                  jsonObj[i].EPS,
                  jsonObj[i].Reserves,
                  jsonObj[i].Debt,
                ].join("','") +
                "'" +
                ")RETURNING id",
              (err, result) => {
                if (err) {
                  console.log("ffff");
                }
                console.log("ffff");
              }
            );
          }
          writeToDatabase();
        }
      });
  }
};
module.exports = initial;
