const { Recipe, Ingredient, IngredientsRecipes } = require('../../db');
const { procesarIngredientsConSet } = require("../Utils/aux_controller")


const recipesPostController = async ( name, details, produced_amount, type_measure, ingredArray, store_id ) => {
    const newRecipe = await Recipe.create({ name, details, produced_amount, store_id }) 
    await createIngredient({RecipeId: newRecipe.id, ingredArray, name, type_measure, store_id});
    delete newRecipe.dataValues.store_id
    delete newRecipe.dataValues.updatedAt
    delete newRecipe.dataValues.createdAt
    delete newRecipe.dataValues.deletedAt
    return newRecipe;
}

const createIngredient = async ({RecipeId, ingredArray, name, type_measure, store_id }) => {
    const layer = processLayer(ingredArray)
    const ingredients_all =  await buildIngredientsAll({ RecipeId, ingredArray })
    await Ingredient.create({name, layer, type_measure, ingredients_all, store_id })
}

const buildIngredientsAll = async ({RecipeId, ingredArray}) => {
    let retorno = [];
    let result = [];
    for (let i = 0; i < ingredArray.length; i++) {
        let ing = ingredArray[i];
        if (ing.layer == 0){
            let withWasteRate = ing.amount * ((100 + ing.waste_rate) / 100 )
            retorno.push({id: ing.id, name: ing.name, amount: withWasteRate, type_measure: ing.type_measure})
        }else {
            let getIngredient = await Ingredient.findByPk(ing.id);
            //console.log(getIngredient.dataValues.ingredients_all);
            //let list = JSON.parse(getIngredient.ingredients_all);
            let list = getIngredient.dataValues.ingredients_all
            await Promise.all( list.map(elem => {
                let withWasteRateAux = elem.amount * ing.amount * ((100 + ing.waste_rate) / 100 )
                retorno.push({id: elem.id, name: elem.name, layer: elem.layer, amount: withWasteRateAux, type_measure: elem.type_measure})
            }))
        }
        result.push({RecipeId, IngredientId: ing.id, waste_rate: ing.waste_rate, per_recipe:  ing.per_recipe});
    }
    IngredientsRecipes.bulkCreate(result)

    return await procesarIngredientsConSet(retorno);
}


const processLayer = (ingredArray) => {
    let maxLayer = Number.MIN_SAFE_INTEGER;
    ingredArray.forEach(ingred => maxLayer = ingred.layer > maxLayer ? ingred.layer : maxLayer)
    return ++maxLayer;
}

module.exports = {
    recipesPostController,
 }