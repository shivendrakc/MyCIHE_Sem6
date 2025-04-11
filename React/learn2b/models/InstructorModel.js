import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    required : true,
  },
  car: {
    model : {
      type: String,
      required: true,
    },
    year : {
      type: Number,
      required: True,
    }
  },
  availability: {
    type: String,
    reuqired: True,
  }

})