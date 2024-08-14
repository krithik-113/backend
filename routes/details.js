const router = require('express').Router()
const User = require("../database/schema-and-model")
const {Types} = require('mongoose')

//  http://localhost:3003/api/details/user/:email

router.get('/user/:email', async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({ email })
        if (user && user.role === 'admin') {
            const users = await User.find()
            res.json({userDetails:users})
        } else {
            res.json({message:"Since you are not admin to see other info's",Data:user})
        }
    } catch (err) {
        console.log(err.message)
    }
})


//  http://localhost:3003/api/details/user/:email
router.put('/user/update/:email', async (req, res) => {
    const { email } = req.params
    const {role} = req.body
    try {
        const user = await User.updateOne({ email },{$set:{role:role}})
        if (!user) {
            res.json({messgae:"Somthing went wrong"})
        } else {
            res.json({message:"Updated Successfully",data:user})
        }
    } catch (err) {
        console.log(err.message)
    }
})


//  localhost:3003/api/details/rolechange
router.post('/rolechange', async (req, res) => {
    const namesOfAdmin = []
    try {
        const user = await User.find({ role: "admin" })
        console.log(user)
        if (user.length) {
            user.map((val) => {
              namesOfAdmin.push({name:val.firstName + " " + val.lastName , email:val.email});
            });
            res.json({ namesOfAdmin });
        } else {
            res.json({message:"No Admin is available right now...!"})
        }
        console.log(namesOfAdmin)
    } catch (err) {
        console.log(err.message)
    }
})


// localhost:3003/api/details/userrolechange
router.put('/userrolechange', async (req, res) => {
    const { userEmail, adminEmail,message } = req.body
    try {
        const user = await User.findOne({ email: userEmail })
        if (user && user.role !== "admin") {
            const admin = await User.updateOne({ email: adminEmail }, { $set: { message: message,userEmail } })
            res.json({message:admin})
        } else {
            res.json({message:"Something went wrong :-("})
        }
    } catch (err) {
        console.log(err.message)
    }
})


//  http://localhost:3003/api/details/rolechange/request/:email
router.get('/rolechange/request/:email', async (req, res) => {
    const {email} = req.params
    try {
        const user = await User.findOne({ email })
        if (user && user.message) {
            res.json({message:user.message,userEmail:user.userEmail,id:user._id})
        } else {
            res.json({message:"No message received...!"})
        }
    } catch (err) {
        console.log(err.message)
    }
})

//  http://localhost:3003/api/details/msgdelte/:email
router.put('/msgdelte/:email', async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.updateOne({ email }, { $set: { message: "", userEmail: "" } })
        res.json({masgUpdate:user})
    } catch (err){
        console.log(err.message)
    }
})

module.exports = router