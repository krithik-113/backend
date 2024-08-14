const router = require('express').Router()
const { Types } = require("mongoose")
const User = require('../database/schema-and-model')

//  http://localhost:3003/api/delete/user/:id
router.delete("/user/:id", async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.deleteOne({ _id: new Types.ObjectId(id) })
        if (user) {
            const remain = await User.find()
            res.json({message:"User record deleted successfully!!!..",users:remain})
        }
    } catch (err) {
        console.log(err.message)
    }
});

module.exports = router