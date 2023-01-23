const Chat = require('../model/Chat.js');

const sendMessage = async(req, res) => {
    try {
        const data = {
            message: req.body.message,
            user: req.body.id,
            messageTo: req.body.to,
            sender: req.body.sender
        }

        const message = await new Chat(data);
        await message.save();
        data._id = message._id;
        console.log(message)
        res.json({
            message
        })
    } catch (error) {
        res.status(500).json({
            messae: "Error send message",
         });
    }

}

const getMessage = async (req, res) => {
    try {
        const ChatAll = await Chat.find({ $or: [{ user: req.params.id, messageTo: req.params.toId }, { user: req.params.toId, messageTo:  req.params.id }]}).populate('user').populate('messageTo').sort({ "timestamp" : -1 })
        res.json({
            data: ChatAll
        })
    } catch (error) {
        res.status(500).json({
            messae: "Не вдалось знайти",
         });
    }
}

module.exports = {
    getMessage,
    sendMessage
}