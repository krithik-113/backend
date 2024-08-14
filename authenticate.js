const jwt = require("jsonwebtoken");

const token = (id) => jwt.sign({ id: id }, "ffdvfejjdf", { expiresIn: "1m" });

module.exports = token