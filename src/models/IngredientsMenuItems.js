const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("IngredientsMenuItems", {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    }, { timestamps: false })
}