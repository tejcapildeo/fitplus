import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const workoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }], // Referencing exercises by ID
  createdAt: { type: Date, default: Date.now }
})

const Workout = model('Workout', workoutSchema);
export default Workout;