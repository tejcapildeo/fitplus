import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  
const { Schema, model } = mongoose;

const userSchema = new Schema ({
    username : {type: String, required : true, trim :true, unique:true},
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Invalid email']
    },
    password : {type : String, required: true},
    dateJoined : {type: Date, default : Date.now},
    friends : [{type: Schema.Types.ObjectId, ref: 'User' }],
}, {timestamps: true})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  // bcrypt.compare returns a Promise<boolean>, resolving true if the candidate matches the hashed this.password
  return bcrypt.compare(candidatePassword, this.password);
};  

const User = model('User', userSchema);
export default User;