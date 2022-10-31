import mongoose from "mongoose";

const PageonShema = new mongoose.Schema({
    number: {
        type: Number, 
        required: true,
    },
    image: {
        type: String,
        default: "none"
    },
    year: {
        type: Number,
        required: true
    }, 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
},
    {
    timestamps: true,

    }
);

export default mongoose.model("Pageon", PageonShema);