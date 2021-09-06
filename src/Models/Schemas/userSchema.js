import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    default: ""
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    default: ""
  },
  email: {
    type: String,
    required: true,
    min: 8,
    max: 255,
    default: ""
  },
  registeredAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  lastLogin: {
    type: Date,
    required: true,
    default: new Date()
  }
}, { _id: false })


export default mongoose.model('User', userSchema);