import Conversation from "../models/conversation.model.js";
import UserToConversation from "../models/usertoconversation.model.js";

async function saveConversation(userId) {
    try {

        const conversationExists = await Conversation.findOne({
            where: {
                id: "sdfasdasdal"
            }
        })

        if (!conversationExists) {

            const saveConversation = await Conversation.create(
                {
                    id: "sdfasdasdal",
                    participants: JSON.stringify({ p1: userId, p2: "p2id" }),
                }
            );

            if (!saveConversation) {
                throw new Error({ message: "Error saving conversation!" });
            }
        }


        const userToConversationExists = await UserToConversation.findOne({
            where: {
                userid: userId
            }
        });

        if (!userToConversationExists) {

            const userToConversationSave = await UserToConversation.create({
                userId: userId,
                conversationId: conversationExists.id
            })

            if (!userToConversationSave) {
                throw new Error({ message: "Error saving message!" });
            }
        }

    } catch (error) {
        throw error;
    }
}

export default saveConversation;
