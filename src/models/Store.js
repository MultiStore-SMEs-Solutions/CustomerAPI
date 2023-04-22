const { DataTypes } = require("sequelize");
const { DUPLICATED_NAME, INVALID_STORE_NAME, ALPHANUMERIC_ONLY, INVALID_STORE_SHORT_NAME,
        DUPLICATED_SHORT_NAME, INVALID_STORE_DESC } = require("./utils/Store-ErrorMSGs");

module.exports = (sequelize) => {
    sequelize.define('Store', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
              isUUID: 4,
            },
            field: "store_id"
          },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: INVALID_STORE_NAME },
                notEmpty: { msg: INVALID_STORE_NAME },
            },
            unique: { msg: DUPLICATED_NAME }
        },
        short_name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            unique: true,
            references: { model: 'Stores', key: 'short_name' },
            validate: {
                notNull: { msg: INVALID_STORE_SHORT_NAME },
                notEmpty: { msg: INVALID_STORE_SHORT_NAME },
                isAlphanumeric: { msg: ALPHANUMERIC_ONLY},
            },
            unique: { msg: DUPLICATED_SHORT_NAME }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: INVALID_STORE_DESC },
                notEmpty: { msg: INVALID_STORE_DESC },
            },
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://spacefood.up.railway.app/static/media/logo.1d65576293f6641075ed.jpg"
        },
        store_type: {
            type: DataTypes.ENUM,
            values: ["Traveling Business", "Other"],
            defaultValue: "Traveling Business",
            allowNull: false
        },
        mercado_pago: {
            type: DataTypes.JSON,
            allowNull: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: false,
        paranoid: true,
        indexes: [{ fields: ['short_name'] }],
    }
    )
}