const { DataTypes } = require("sequelize");
const { INVALID_TAG_NAME } = require("./utils/Tag-ErrorMSGs");

module.exports = (sequelize) => {
    sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            //field: "tag_id"
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            //unique: "store_id-name",
            validate: {
                notNull: {
                    msg: INVALID_TAG_NAME
                },
                notEmpty: {
                    msg: INVALID_TAG_NAME
                },
            }
        },
        // store_id: {
        //     type: DataTypes.UUIDV4,
        //     allowNull: false,
        //     validate: {
        //       isUUID: 4,
        //     },
        //     unique: "store_id-name"
        // },
    }, { timestamps: false })
}