const mongoose = require("mongoose");

const ChatShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messageTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String, 
        required: true
    },
    sender: {
        type: String,
        required: true
    }

},
{
    timestamps: true
}
)

const model = mongoose.model("Chat", ChatShema);

module.exports = model;