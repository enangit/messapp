import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const Conversation = sequelize.define("conversation", {
    converstionId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    participants: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    messages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
});

try {
    await Conversation.sync();
} catch (error) {
    console.log(`Conversation sequelize model error: `, error);
}

export default Conversation;
