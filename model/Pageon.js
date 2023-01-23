const mongoose = require("mongoose");

const PageonShema = new mongoose.Schema({
    number: {
        type: Number, 
        required: true,
    },
    urlPhoto: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Commando_pigeon_hu_61413.jpg"
    },
    year: {
        type: Number,
        default: '2023'
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

const model = mongoose.model("Pageon", PageonShema);

module.exports = model;