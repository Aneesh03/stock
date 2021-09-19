const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const initial = require("./initial");
dotenv.config();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
// ** MIDDLEWARE ** //
const whitelist = ["http://localhost:3000", "https://stocks-nse.herokuapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
// import route
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

app.use(express.json());
// route middleware
app.use("/api/user", authRoute);
app.use("/api/home", postRoute);
// write to database from csv
// --> Add this
// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}
#initial();
app.listen(process.env.PORT || 8000, () =>
  console.log("Server is Up and running")
);
