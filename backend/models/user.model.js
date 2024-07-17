import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileUri: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

try {
    await User.sync();
    console.log(`User model synced success!`);
} catch (err) {
    console.log(`user.model.js error: ${err}`);
}

export default User;
