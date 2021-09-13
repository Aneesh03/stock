import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import "./home.css";
const Home = () => {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;
  const [stocks, setStocks] = useState([]);
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [targetStock, setTargetStocks] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    Axios.get("/api/home/stocks", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = stocks.filter((stock) => {
        const regex = new RegExp(`^${text}`, "gi");
        return stock.name.match(regex);
      });
    }
    setSuggestion(matches);
    setText(text);
    setShow(false);
  };
  const onSuggestionHandler = (text) => {
    setText(text);
    setSuggestion([]);
    Axios.post("/api/home/find-stock", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: text,
    })
      .then((response) => {
        setTargetStocks(response.data[0]);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="outer-container">
      <div className="upper-container">
        <div className="container">
          <span className="title">Stocks</span>
        </div>
      </div>
      <div className="bottom-container">
        <div className="inner-container container">
          <span className="middle-title">
            The easiest way to buy <br /> and sell stocks.
          </span>
          <span className="bottom-title">
            Stock analysis and screening tool for <br />
            investors in India.
          </span>
          <div className="search-stocks">
            <span className="search-icon">{searchIcon}</span>
            <input
              className="search-stocks-input"
              onChange={(e) => onChangeHandler(e.target.value)}
              value={text}
            />
          </div>
          <div className="suggestion-div">
            <div className="suggestion-inner-div">
              {suggestion &&
                suggestion.map((suggestion, i) => (
                  <div
                    className="suggestion"
                    key={i}
                    onClick={() => onSuggestionHandler(suggestion.name)}
                  >
                    {suggestion.name}
                  </div>
                ))}
            </div>
          </div>
          {show ? (
            <div className="detail-outer-div">
              <div className="details">
                <p className="heading-stock">{targetStock.name}</p>
                <div className="detail-inner-div">
                  <div className="stock-details">
                    <p className="detail">
                      Market Cap
                      <span className="result">{targetStock.marketcap}</span>
                    </p>
                    <div className="inside-div">
                      <span>
                        Current Price
                        <span className="result">
                          {targetStock.currentmarketprice}
                        </span>
                      </span>
                    </div>
                    <p className="detail">
                      Stock P/E{" "}
                      <span className="result">{targetStock.stockpe}</span>
                    </p>
                    <div className="inside-div">
                      <span>
                        Dept <span className="result">{targetStock.debt}</span>
                      </span>
                    </div>
                  </div>
                  <div className="stock-details">
                    <p className="detail">
                      Divident Yield{" "}
                      <span className="result">
                        {targetStock.dividendyield}
                      </span>
                    </p>
                    <div className="inside-div">
                      <span>
                        ROCE <span className="result">{targetStock.roce}</span>
                      </span>
                    </div>
                    <p className="detail">
                      ROE{" "}
                      <span className="result">
                        {targetStock.roepreviousannum}
                      </span>
                    </p>
                  </div>
                  <div className="stock-details">
                    <p className="detail">
                      Debt Equality{" "}
                      <span className="result">{targetStock.debttoequity}</span>
                    </p>
                    <div className="inside-div">
                      <span>
                        Eps <span className="result">{targetStock.eps}</span>
                      </span>
                    </div>
                    <p className="detail">
                      Reserves{" "}
                      <span className="result">{targetStock.reserves}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default withRouter(Home);
