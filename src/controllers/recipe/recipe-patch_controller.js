const { Recipe, Ingredient } = require("../../db");

const recipesPatchController = async (id, name, details, store_id) => {
  const recipe = await Recipe.findOne( { where: { id, store_id } } )
  const result =  Recipe.update({ name, details },
                                    { where: { id, store_id } }).then(
                  Ingredient.update({ name },
                                    { where: { name: recipe.name, store_id }})
                              )
  return result;
};

module.exports = {
    recipesPatchController
};