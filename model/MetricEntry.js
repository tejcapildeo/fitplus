// models/MetricEntry.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const metricEntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metric: {
    type: Schema.Types.ObjectId,
    ref: 'Metric',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  // adds updatedAt
});

// Compound index for fast lookups of (user, metric) over time
metricEntrySchema.index({ user: 1, metric: 1, date: 1 });

export default model('MetricEntry', metricEntrySchema);
