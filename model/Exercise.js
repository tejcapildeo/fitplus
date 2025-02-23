import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      sets: {
        type: Number,
        required: true,
        min: 1
      },
      reps: {
        type: Number,
        required: true,
        min: 1
      },
      weight: {
        type: Number,
        required: true,
        min: 0
      }
    
})

const Exercise = model('Exercise', exerciseSchema);
export default Exercise;