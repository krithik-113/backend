const router = require('express').Router()
const { Types } = require("mongoose")
const User = require('../database/schema-and-model')
const bcrypt = require("bcrypt");

//  http://localhost:3003/api/edit/getinfo/:email
router.get("/getinfo/:email", async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({ email })
        if (user) {
            res.json({message:user})
        }
    } catch (err) {
        console.log(err.message)
    }
});


//  http://localhost:3003/api/edit/user/:userId
router.put('/user/:userId', async (req, res) => {
    const { userId } = req.params
    const {firstName,lastName,password,email,yearsOfExp,salary} = req.body
    try {
        const user = await User.findOne({ _id: new Types.ObjectId(userId) })
        if (user) {
            const emails = await User.find({ email })
            if (emails.length && !emails[0]._id === userId) return res.json({ message: `This ${email} Useremail already taken!...` })
            const hashPass = await bcrypt.hash(password,10);
            const update = await User.updateOne(
               { _id: new Types.ObjectId(userId) },
               { $set: { firstName, lastName, email, yearsOfExp, salary,password:hashPass } }
            );
            if (update) return res.json({
              message: `Hello!, ${
                firstName + " " + lastName
              } changes updated successfully`,
              update,
            });
            res.json({mesage:"No changes has been made right now..."})
        }
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router