const { DataTypes } = require("sequelize");
const { ROLES_ENUM } = require("./utils/constants");

module.exports = (sequelize) => {
    sequelize.define("Role",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.ENUM,
            values: ROLES_ENUM,
            defaultValue: ROLES_ENUM[0],
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    })
}