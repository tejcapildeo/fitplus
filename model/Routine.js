import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const routineSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Workout' }], // Referencing workouts by ID
  createdAt: { type: Date, default: Date.now }
})

const Routine = model('Routine', routineSchema);
export default Routine;