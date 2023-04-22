const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Review", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                max: 5,
                min: 1
            }
        },
        title: {
            type: DataTypes.STRING(180),
            allowNull: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, { timestamps: true })
}