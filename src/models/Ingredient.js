const { DataTypes } = require("sequelize");
const { MEASURES_SHORT } = require("./utils/constants")
const { INVALID_INGREDIENT_NAME, NOT_A_NUMERIC } = require("./utils/Ingredient-ErrorMSGs")

module.exports = (sequelize) => {
    sequelize.define("Ingredient", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "ingredient_id"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "name-store_id",
            validate: {
                notNull: {
                    msg: INVALID_INGREDIENT_NAME
                },
                notEmpty: {
                    msg: INVALID_INGREDIENT_NAME
                },
            },
        },
        layer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isNumeric: {
                    msg: NOT_A_NUMERIC
                },
                min: 0,
            }
        },
        type_measure: {
            type: DataTypes.ENUM,
            values: MEASURES_SHORT,
            defaultValue: MEASURES_SHORT[0],
            validate:{
                isIn: [MEASURES_SHORT]
            }
        },
        ingredients_all: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        store_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: "name-store_id",
            validate: {
              isUUID: 4,
            },
        },
    }, { timestamps: true, paranoid: true })
}