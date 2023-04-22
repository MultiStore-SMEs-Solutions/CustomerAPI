const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Password", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "password_id"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    // {
    //     timestamps: true,
    //     paranoid: true
    // }
)
}