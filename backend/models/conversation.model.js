import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const Conversation = sequelize.define("conversation", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    participants: {
        type: DataTypes.JSON,
        allowNull: false,
    }
});



export default Conversation;
