import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema ({
    username : {type: String, required : true, trim :true, unique:true},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
    password : {type : String},
    dateJoined : {type: Date, default : Date.now}
})

const User = model('User', userSchema);
export default User;