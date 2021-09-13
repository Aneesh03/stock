const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("../database");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await client.query(
      "SELECT * FROM Users WHERE email =" + "'" + [req.body.email] + "'"
    );
    if (user.rows.length > 0) {
      return res.status(400).send("Email already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await client.query(
      "INSERT INTO Users (name, email, password) VALUES (" +
        "'" +
        [req.body.name, req.body.email, hashPassword].join("','") +
        "'" +
        ")RETURNING id",
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.send(result.rows[0].id.toString());
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await client.query(
      "SELECT * FROM Users WHERE email =" + "'" + [req.body.email] + "'"
    );
    if (user.rows.length == 0)
      return res.status(400).send("Email is not found");
    const validPass = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );
    if (!validPass) return res.status(400).send("invalid password");
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
