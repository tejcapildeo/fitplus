import mongoose from "mongoose";
const { Schema, model } = mongoose;

/**
 * This one is the basis of all the metrics that will be measured. These are things like bodyweight, calories eaten per day, bench press max, max number of pullups.
 * Also this model has all the details, but the other models like UserMetric and MetricEntry will help with tying them to users and then also dealing with multiple instances
 * over time.
 */

const metricSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,      // no two metrics (standard or custom) share the same name
      },
      unit: {
        type: String,
        default: '',       // e.g. "lbs", "kg", "kcal", "reps"; optional
        trim: true
      },
      description: {
        type: String,
        default: '',       // optional explanation of what this metric tracks
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }

});

//this index helps to speed up queries by limiting the number of things that need to be scanned.. so more efficient
metricSchema.index({isStandard : 1})

export default model('Metric', metricSchema);
