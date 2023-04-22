const { DataTypes } = require("sequelize");
const { INVALID_PRICE } = require("./utils/Order-ErrorMSGs");
const { ORDER_STATUS } = require("./utils/constants")

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "order_id"
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: { msg: INVALID_PRICE },
                //isNull: { msg: INVALID_PRICE },
                min: 0
            }
        },
        client_data: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING(4),
            allowNull: true,
            defaultValue: "A000"
        },
        // store_id: {
        //     //! TODO
        //     // Eliminar DefaulValue y default value
        //     //type: DataTypes.UUIDV4,
        //     type: DataTypes.STRING,
        //     defaultValue: "f3bc0474-620c-429d-a46c-df2460c7725a",
        //     allowNull: false,
        // },
        status: {
            type: DataTypes.ENUM,
            values: ORDER_STATUS,
            defaultValue: ORDER_STATUS[0],
            allowNull: false,
        },
        payment_data: {
            type: DataTypes.JSON,
            allowNull: true
        }
    },
    {
        timestamps: true,
        paranoid: true,
    })
}
