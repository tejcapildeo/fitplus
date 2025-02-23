import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './routes/users'
// const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

//middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Workout Tracker API Running');
});



require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))                                         
  .catch(err => console.log(err));


app.use('/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
