import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";
import User from "./user.model.js";

const Message = sequelize.define("message",
    {
        messageId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        senderId: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
        },
        receipientId: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
        },
        message: {
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
