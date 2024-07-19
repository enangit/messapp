import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const UserToConversation = sequelize.define(
    "user_to_conversation",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

try {
    await UserToConversation.sync();
} catch (error) {
    console.log("UserToConversation model error: ", error);
}

export default UserToConversation;
