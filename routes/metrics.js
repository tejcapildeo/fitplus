// routes/metrics.js
import express from 'express';
import Metric from '../model/Metric.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /metrics
// Returns the full list of standard metrics for everyone to choose from
router.get('/', auth, async (req, res) => {
  try {
    const metrics = await Metric.find().sort({ name: 1 });
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
