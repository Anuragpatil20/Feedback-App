const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const UsersModel = require ('./module/Users')
 


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/feedback')



app.post("/createUser", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    // Check if email already exists
    const existingUser = await UsersModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = await UsersModel.create({ name, email, feedback });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(3001, () =>{
    console.log("Server is Running")
})