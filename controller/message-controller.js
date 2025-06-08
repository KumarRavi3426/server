import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js"

export const newMessage = async(req, res)=>{
    try {
        const newMessage = new Message(req.body)

        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId, {message: req.body.text})
         
        return res.status(200).json("Message sent successfully")
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getMessage = async(req, res)=>{
    try {
        const data = await Message.find({conversationId: req.params.id})
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}