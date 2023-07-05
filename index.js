const express = require('express');
const { Connection } = require('./config/db');
const { User } = require('./models/User.model');
const { Product } = require('./models/User.model');
const app = express();




app.use(express.json()) // smiddleware

let products = [];

app.get("/",(req,res)=>{
    const {your} = req.body;

    if(your == "Dev"){
        return res.status(200).json({"Message":"Our server has been successfully created"})
    }else{
        return res.status(500).json({"error":"you are not authrized"})
    }
})

app.post("/register",async (req,res)=>{
    const {username,password} = req.body;

      try {
         const user = await User({
            username,
            password
         });
         await user.save();
         return res.status(200).json({"message":"user registered success"})
      } catch (error) {
         return res.status(400).json({"error":error})
      }
})

app.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username:username,password:password});
        if(user){
            return res.status(200).json({"User":user})
        }
        else{
            return res.status(400).json({"message":"User not found"})
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


  app.post('/products', (req, res) => {
    try {
      const { name, price, description } = req.body;
  
      // Perform any necessary validation on the input
  
      // Create a new product object
      const newProduct = {
        id: products.length + 1, // Generate a unique ID (you can use a library like uuid for this)
        name,
        price,
        description
      };
  
      // Add the product to the database (or your desired data store)
      products.push(newProduct);
  
      // Return a success response
      return res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
    } catch (err) {
      // Return an error response
      return res.status(500).json({ success: false, error: err.message });
    }
  });
  


app.listen(3000, async()=>{
    try {
        await Connection;
        console.log("DB connected Success")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is Running on port 3000")
})


