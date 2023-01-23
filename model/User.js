const mongoose = require("mongoose");

const UserShema = new mongoose.Schema(
  {
    name: {
       type: String,
       required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatar: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBm6xN2esEXj4PCzOCJui2kuVOPkbkX0O5A4r5NtsG8iNYytQYqsxcoTTDYGjYbS9wjB0&usqp=CAU'
    },
    region: {
      type: String,
      default: 'Не вказано'
    }
  },
  {
     timestamps: true,

  } 
);

const model = mongoose.model("User", UserShema);

module.exports = model;