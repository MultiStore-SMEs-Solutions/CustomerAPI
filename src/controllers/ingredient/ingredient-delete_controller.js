const { Ingredient } = require("../../db");
const { generateOldName } = require("../Utils/aux_controller")

const ingredientsDeleteController = async (ingredientsIds) => {
  const result = await Ingredient.destroy({where: {id: ingredientsIds}});
  return result
};

//* recipe_delete_controller.js
//* 
const ingredientsDeleteController2 = async(id, store_id) => {
  //! bind con .then() para manejar Success y Error
  const ingredient = await Ingredient.findOne({where: {id, store_id}, paranoid: false})
  const simpleName = ingredient.name;
  //const label = ingredient.label;
  let oldName;
  do{
    oldName = generateOldName(simpleName);
  }while (await Ingredient.findOne({where: {name: oldName, store_id}, paranoid: false}))
  //! Queda recorrer por todos los ingredientes del store id cambiando el nombre
  //! Opcional
  await Ingredient.update({name: oldName}, {where: {id, store_id}})
  return await Ingredient.destroy({where: {id, store_id}});
}

module.exports = { ingredientsDeleteController, ingredientsDeleteController2 };
