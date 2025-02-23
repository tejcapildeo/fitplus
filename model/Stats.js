import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const statsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: { type: String, required: true, trim: true },
  value: {type : Number, required : true, trim : true},
  date: { type: Date, default: Date.now, required:true }
})

statsSchema.index({ user: 1, name: 1 });

const Stats = model('Stats', statsSchema);
export default Stats;