const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../database/schema-and-model");

const token = require("../authenticate");

// http://localhost:3003/api/admin/register
router.post("/register", async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const bcryptPassword = await bcrypt.hash(password, 10);
      req.body.password = bcryptPassword;
      
      const createUser = new User(req.body);

      // Registeration user role always must be admin to check admin functionality
      createUser.role = "admin"
      console.log(createUser)
      await User.create(createUser);
      res.json(req.body);
    } else {
      res.json({ message: "User email already taken or exist" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

//  http://localhost:3003/api/admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        message: "User email is incorrect",
        status: false
      });
    } else {
      const bool = await bcrypt.compare(password, user.password);
      if (bool) {
        res.json({ message: token(user.__id), status: true,data:user });
      } else {
       
        res.json({message:"User password is incorrect"})
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

//  http://localhost:3003/api/admin/auth
router.get("/auth", (req, res) => {
   const token = req.headers["authentication"];
   if (token) {
     jwt.verify(token, "ffdvfejjdf", (err, decode) => {
       if (err) res.json({ auth: false, message: err.message });
       res.json({ message: decode, auth: true });
     });
   } else {
     res.json({
       message: "Yo, We need a token give it to us next time!",
       auth: false,
     });
   }
 
});



module.exports = router;
