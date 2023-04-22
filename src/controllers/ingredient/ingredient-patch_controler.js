const { Ingredient } = require("../../db");

const ingredientsPatchController = async (id, name, type_measure, store_id ) => {
  const result = await Ingredient.update({ name, type_measure },
                                              { where: { id, store_id } });
  return result;
};

module.exports = {
  ingredientsPatchController
};
