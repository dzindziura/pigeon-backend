import mongoose from "mongoose"

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
    }
  },
  {
     timestamps: true,

  } 
);

export default mongoose.model("User", UserShema);