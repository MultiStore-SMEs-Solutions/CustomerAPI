const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define('TagsMenuItems', {}, { timestamps: false })
}