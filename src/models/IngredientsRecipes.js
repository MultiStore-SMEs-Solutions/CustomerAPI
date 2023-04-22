const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("IngredientsRecipes", {
          waste_rate: {
            type: DataTypes.FLOAT,
            defaultValue: 0
          },
          per_recipe: {
            type: DataTypes.FLOAT,
            defaultValue: 1,
            validate: {
              min: 0,
            }
          }
    }, { timestamps: false })
}