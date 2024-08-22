const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();

async function Connect_MongoDB() {
  await mongoose.connect(
    "mongodb+srv://krithik-0113:cFW3QeW6xk0WupR0@cluster0.y8z4nih.mongodb.net/userInfo?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connected Successfully");
}

app.use(express.json());
app.use(cors());
app.use("/api/admin", require("./routes/auth"));
app.use('/api/details', require('./routes/details'))
app.use('/api/edit', require('./controllers/EditUser'))
app.use('/api/delete',require('./controllers/DeleteRecord'))

app.listen(3003, () => {
  console.log("Server is running in port http://localhost:3003/");
  Connect_MongoDB().catch((err) => console.log(err.message));
});
