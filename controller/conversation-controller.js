import Conversation from "../model/Conversation.js";

export const newConversation = async(req, res)=>{
    try {
        let senderId = req.body.senderId;
        let receiverId = req.body.receiverId;
        const exist = await Conversation.find({members: {$all: [senderId, receiverId]}})
        
        // didn't use exist, because even if empty, it will return an array of length 0
        if(exist.length > 0){
            res.status(200).json('conversation already exists');
            return;
        }

        const newConversation = new Conversation({members: [senderId, receiverId]});
        await newConversation.save();
        return res.status(200).json('conversation saved successfully');

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getConversation = async(req, res)=>{
    // if this was a get request
    // let senderId = req.query.senderId;
    // let receiverId = req.query.receiverId;
    let senderId = req.body.senderId;
    let receiverId = req.body.receiverId;
    try {
        const conversation = await Conversation.findOne({members: {$all: [senderId, receiverId]}})
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}