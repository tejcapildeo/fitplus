import mongoose from 'mongoose';
import express from 'express';

import authRouter       from './routes/auth.js';
import profileRouter    from './routes/profile.js';
import metricsRouter    from './routes/metrics.js';
import entriesRouter    from './routes/entries.js';
import friendsRouter    from './routes/friends.js';
import aiRouter         from './routes/ai.js';

import { seedStandardMetrics } from './scripts/seedMetrics.js';


import 'dotenv/config';  //this loads the variables from .env into process.env


const app = express();
const PORT = process.env.PORT || 5000;
//middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Workout Tracker API Running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedStandardMetrics();
    
  })                                         
  .catch(err => console.log(err));


// Public Routes
app.use('/auth', authRouter);        // register / login

// Protected Routes
app.use('/profile', profileRouter);  // user’s own profile
app.use('/metrics', metricsRouter);  // opt-in/configure metrics
app.use('/entries', entriesRouter);  // create / fetch time‐series data
app.use('/friends', friendsRouter);  // add/remove friends, compare entries
app.use('/ai', aiRouter);            // generative‐AI endpoints

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
