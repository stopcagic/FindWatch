import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  registeredAt: {
    type: Date,
    required: true
  },
  lastLogin: {
    type: Date,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    requred: true
  },
  userData: {
    type: String
  }
})


export default mongoose.model('User', userSchema);