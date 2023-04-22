const { Ingredient } = require("../../db");

const ingredientsGetController = async (store_id) => {
  const result = await Ingredient.findAll({
    where: {store_id},
    attributes: { exclude: ['createdAt', 'deletedAt', "updatedAt", "store_id"] }
  });
  return result;
};
const ingredientsGetByIdController = async (id, store_id) => {
  const result = await Ingredient.findOne({
    where: {id, store_id},
    attributes: { exclude: ['createdAt', 'deletedAt', "updatedAt", "store_id"] }
  });
  return result;
}

module.exports = {
  ingredientsGetController,
  ingredientsGetByIdController
 };
