const { DataTypes } = require("sequelize");
const { INVALID_RECIPE_NAME, INVALID_PRODUCED_AMOUNT, MIN_PROD_AMOUNT } = require("./utils/Recipe-ErrorMSGs");

module.exports = (sequelize) => {
    sequelize.define('Recipe', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field: "recipe_id"
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: INVALID_RECIPE_NAME
                },
            },
            unique: "name-store_id"
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        produced_amount: {
            type: DataTypes.FLOAT,
            defaultValue: MIN_PROD_AMOUNT,
            validate: {
                isNumeric: {
                    msg: INVALID_PRODUCED_AMOUNT
                },
                min: MIN_PROD_AMOUNT,
            }
        },
        store_id: {
            type: DataTypes.UUID,
            allowNull: true,
            unique: "name-store_id",
            validate: {
              isUUID: 4,
            },
        },

    }, {
        timestamps: true,
        paranoid: true,
        })
}