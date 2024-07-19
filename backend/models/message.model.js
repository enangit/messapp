import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const Message = sequelize.define("message",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        conversationId: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

try {
    await Message.sync();
} catch (error) {
    console.log(`Sequelize Message Model error: `, error);
}

export default Message;
