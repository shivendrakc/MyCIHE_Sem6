import express from 'express';
import dotenv from 'dotenv';
// import { connectDB } from './config/db.js'; 
// import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});


app.post('/products', async (req, res) => {
  const product = req.body;
  
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success:false, message: 'Please provide all fields'});
  }

  const newProduct = new Product(product);

  try {
      await newProduct.save();
      res.status(201).json({success:true, data: newProduct});
  } catch(error) {
      console.error("Error in Create Product", error.message);
      res.status(500).json({success:false, message: 'Server Error'});
  }
});



app.listen(5000, () => {
    // connectDB();
  console.log('Server is running on http://localhost:5000/hello');
});

//