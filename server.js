const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

//middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Workout Tracker API Running');
});

app.listen(PORT, () => console.log(`Serger running on port ${PORT}`));

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));