const { Recipe, Ingredient } = require('../../db');

//* Adds store_id
const recipesGetController = async (store_id) => {
    const results = await Recipe.findAll({
      where: {store_id},
      paranoid: false,
      attributes: {exclude: ["createdAt", "updatedAt", "deletedAt", "store_id"] },
      order: [["deletedAt", "DESC"]],
    })
    for (let i = 0; i < results.length; i++) {
      results[i].dataValues["ingredientsList"] = await buildIngredientsList(results[i].dataValues);
    }

    return results;
}

const buildIngredientsList = async (recipe) => {
  const ingredient = await Ingredient.findOne({where: {name: recipe.name}})
  return ingredient.dataValues.ingredients_all
}
//* Adds store_id
const recipesGetByIdController = async (id, store_id) => {
    const result = await Recipe.findOne({
      where: { id, store_id, },
      attributes: {exclude: ["createdAt", "updatedAt", "deletedAt", "store_id"] },
      paranoid: false
    });
    result.dataValues["ingredientsList"] = await buildIngredientsList(result.dataValues)
    return result;
  }

module.exports = {
    recipesGetController,
    recipesGetByIdController
 }