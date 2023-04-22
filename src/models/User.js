const { DataTypes } = require("sequelize");
const { Role } = require("./Role")
const { INVALID_EMAIL, INVALID_NAME, INVALID_LAST_NAME } = require("./utils/User-ErrorMSGs")

module.exports = (sequelize) => {
    sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "user_id"
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                is: /^[a-zA-Z íáúóéÍÁÓÚÉñÑ]*$/,
                notEmpty: true,
                notNull: {
                  msg: INVALID_NAME
                }
              },
        },
        last_name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                is: /^[a-zA-Z íáúóéÍÁÓÚÉñÑ]*$/,
                notEmpty: true,
                notNull: {
                  msg: INVALID_LAST_NAME
                }
              },
        },
        account_name: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: INVALID_EMAIL
                },
                notEmpty: true,
                notNull: {
                  msg: INVALID_EMAIL
                }
              },
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
              model: Role,
              key: 'id'
            }
        },
        // created_by: {
        //   type: DataTypes.INTEGER,
        //   allowNull: true
        // }
    },
    {
      timestamps: true,
      paranoid: true,
    }
  )
}
