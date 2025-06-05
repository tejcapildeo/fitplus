// routes/friends.js
import express from 'express';
import User from '../model/User.js';
import MetricEntry from '../model/MetricEntry.js';
import Metric from '../model/Metric.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

/**
 * POST /friends/:friendId
 * Add a friend (user) by ID.
 */
router.post('/:friendId', async (req, res) => {
  try {
    const friendId = req.params.friendId;
    if (friendId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot friend yourself' });
    }
    const friend = await User.findById(friendId);
    if (!friend) return res.status(404).json({ message: 'User not found' });

    if (req.user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    req.user.friends.push(friendId);
    await req.user.save();

    // (Optional) For mutual friendship:
    // friend.friends.push(req.user._id);
    // await friend.save();

    res.status(201).json({ message: 'Friend added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE /friends/:friendId
 * Remove a friend.
 */
router.delete('/:friendId', async (req, res) => {
  try {
    const friendId = req.params.friendId;
    const idx = req.user.friends.indexOf(friendId);
    if (idx === -1) return res.status(404).json({ message: 'Not friends' });

    req.user.friends.splice(idx, 1);
    await req.user.save();

    // (Optional) remove Alice from Bob’s friends array as well
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /friends/:friendId/entries?metricId=<metricId>&from=<date>&to=<date>
 * Fetch a friend’s entries for a given metric, if you’re friends.
 */
router.get('/:friendId/entries', async (req, res) => {
  try {
    const friendId = req.params.friendId;
    if (!req.user.friends.includes(friendId)) {
      return res.status(403).json({ message: 'Not a friend' });
    }

    const { metricId, from, to } = req.query;
    if (!metricId) {
      return res.status(400).json({ message: 'metricId query parameter required' });
    }

    // Ensure the metric exists
    const metric = await Metric.findById(metricId);
    if (!metric) return res.status(404).json({ message: 'Metric not found' });

    // Build filter to fetch friend’s entries
    const filter = {
      user:   friendId,
      metric: metricId
    };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to)   filter.date.$lte = new Date(to);
    }

    const entries = await MetricEntry.find(filter).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
