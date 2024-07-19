import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";


export const Sample = sequelize.define("sample", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export const Foreign = sequelize.define("foreign", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


Sample.hasMany(Foreign, {
    foreignKey: 'id'
});
Foreign.belongsTo(Sample);

