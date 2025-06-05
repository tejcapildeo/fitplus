// routes/entries.js
import express from 'express';
import MetricEntry from '../model/MetricEntry.js';
import Metric from '../model/Metric.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

/**
 * POST /entries
 * Body: { metricId, date?, value, notes? }
 * Creates a new entry for the logged-in user under a standard metric.
 */
router.post('/', async (req, res) => {
  try {
    const { metricId, date, value, notes } = req.body;

    // Validate metric exists
    const metric = await Metric.findById(metricId);
    if (!metric) return res.status(404).json({ message: 'Metric not found' });

    const entry = new MetricEntry({
      user:   req.user._id,
      metric: metricId,
      date:   date || Date.now(),
      value,
      notes:  notes || ''
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET /entries
 * Query params: ?metricId=<metricId>&from=<YYYY-MM-DD>&to=<YYYY-MM-DD>
 * Returns all entries for the logged-in user for a given metric, optionally within a date range.
 */
router.get('/', async (req, res) => {
  try {
    const { metricId, from, to } = req.query;

    // Validate metricId
    if (!metricId) {
      return res.status(400).json({ message: 'metricId query parameter required' });
    }
    const metric = await Metric.findById(metricId);
    if (!metric) return res.status(404).json({ message: 'Metric not found' });

    // Build filter: only this user + this metric
    const filter = {
      user:   req.user._id,
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

/**
 * GET /entries/:entryId
 * Returns a single entry if it belongs to the logged-in user.
 */
router.get('/:entryId', async (req, res) => {
  try {
    const entry = await MetricEntry.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(entry);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Entry ID' });
    }
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /entries/:entryId
 * Body can include any of { date, value, notes } to update.
 * Only the owner can update.
 */
router.put('/:entryId', async (req, res) => {
  try {
    const entry = await MetricEntry.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { date, value, notes } = req.body;
    if (date !== undefined) entry.date = date;
    if (value !== undefined) entry.value = value;
    if (notes !== undefined) entry.notes = notes;

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /entries/:entryId
 * Deletes one entry if it belongs to the logged-in user.
 */
router.delete('/:entryId', async (req, res) => {
  try {
    const entry = await MetricEntry.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await entry.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
