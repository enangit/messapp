import User from "../models/user.model.js";
import UserToConversation from "../models/usertoconversation.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

async function addAssociations() {
    try {

        //user has many messages which means message field will
        //have a foreign key that will to user
        User.hasMany(Message, {
            foreignKey: { user_id: 'id' }
        });
        Message.belongsTo(User);

        //user has many usertoconversation which means usertoconversation field will
        //have a foreign key that will to user also
        User.hasMany(UserToConversation, {
            foreignKey: { user_id: 'id' }
        });
        UserToConversation.belongsTo(User);

        //conversation has many messages which means message field will
        //have a foreign key that will to conversation
        Conversation.hasMany(Message, {
            foreignKey: { conversation_id: 'id' }
        });
        Message.belongsTo(Conversation);

        //conversation has many usertoconversation which means usertoconversation field will
        //have a foreign key that will to conversation
        Conversation.hasMany(UserToConversation, {
            foreignKey: { conversation_id: 'id' }
        });
        UserToConversation.belongsTo(Conversation);



        await User.sync();
        await Message.sync();
        await Conversation.sync();
        await UserToConversation.sync({ alter: true });
    } catch (error) {
        console.log(`Associtaion Utility: \nsequelize model sync error: `, error);
    }
}


export default addAssociations;
