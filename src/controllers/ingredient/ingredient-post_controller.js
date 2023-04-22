const { Ingredient } = require("../../db");

const ingredientsPostController = async (name, layer, type_measure, ingredients_all, store_id ) => {
  const result = await Ingredient.create({name, layer, type_measure, ingredients_all, store_id });
  delete result.dataValues.store_id
  delete result.dataValues.createdAt
  delete result.dataValues.deletedAt
  delete result.dataValues.updatedAt
  return result;
};

module.exports = {
  ingredientsPostController
};
