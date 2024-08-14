const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

const token = (id)=>jwt.sign({ id: id }, key, { expiresIn: "1m" });

module.exports = token