const { Recipe, Ingredient } = require("../../db");
//? ingredientsDeleteController2 se espera que sea el definitivo
const { ingredientsDeleteController2 } = require("../ingredient/ingredient-delete_controller")
const { generateOldName } = require("../Utils/aux_controller");


const recipesDeleteController = async (id, store_id) => {
    //! bind con .then() para manejar Success y Error
    const recipe = await Recipe.findOne({where: {id, store_id}})
    const ingredient = await Ingredient.findOne({where: {name: recipe.name, store_id}})
    const oldName = generateOldName(recipe.name);
    await Recipe.update({name: oldName}, {where: {id, store_id}})
    
    //! ingredientsDeleteController2
    ingredientsDeleteController2(await ingredient.id, store_id);
    return await Recipe.destroy({where: {id, store_id}});
};

module.exports = { recipesDeleteController };