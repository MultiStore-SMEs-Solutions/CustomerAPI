const { Recipe, IngredientsMenuItems, Ingredient, Op } = require("../../db");

const isItAnExistingModelByID = async (id, store_id, model ) => {
    let result = await model.findAll({where: {id, store_id}})
    return result && result.length ? true : false;
}
const isItAnExistingModelByName = async (name, store_id, model ) => {
    let result = await model.findOne({where: {name, store_id}})
    return result && result.length ? true : false;
}

const getRecipeBasicAttrsById = async (id, store_id) => {
    const recipe = await Recipe.findOne({where: {id, store_id}});
    return {id: recipe.id, name: recipe.name,  details: recipe.details, type_measure: recipe.type_measure};
}

const removeIngredientsFromMenu = async (arr) => {
  return await arr.map(res => {
    delete res.Ingredients
    return res
  })
}

const getActualDate = () => {
    const actualDate = new Date().toISOString().split('T')[0];
    return ` (${actualDate})`
}

const buildBOM = async (processedMenus) => {
  //[{ MenuItemId: 1, quantity : 10}, { MenuItemId: 2, quantity : 12}, { MenuItemId: 3, quantity : 12}]
  // pedir cantidad de ingredientes de CADA menu... multiplicado por quantity
  const ingredientMenuItems = await IngredientsMenuItems.findAll({
    where: {
      MenuItemId: {
        [Op.in]: processedMenus.map((item) => item.MenuItemId),
      },
    },
  });
  const cleanIngredsAmount = processIngredsAmount(ingredientMenuItems, processedMenus)
  const fullBOM = estimateBOM(cleanIngredsAmount);
  return fullBOM
}
const estimateBOM = async (ingredArray) => {
    let result =  []
    for (let i = 0; i < ingredArray.length; i++) {
      const ingred =  await Ingredient.findOne({where: { id: ingredArray[i].IngredientId}})
      let arr = ingred.dataValues.ingredients_all
      if (!Array.isArray(arr) || arr.length === 0 ) {
        result.push({id: ingred.dataValues.id, name: ingred.dataValues.name, amount: ingredArray[i].multiplier, type_measure: ingred.dataValues.type_measure});
      }else {
        result.push(...arr.map(elem => {
        elem.amount = elem.amount * ingredArray[i].multiplier
        return elem
        }))
    }
  }

  return procesarIngredientsConSet(result)
}

const processIngredsAmount = (ingredientMenuItems, processedMenus) => {
  const auxResult = ingredientMenuItems.map((item) => {
    const menuItem = processedMenus.find((mi) => mi.MenuItemId === item.MenuItemId);
    const multiplier = menuItem.quantity * item.quantity;
    return { IngredientId: item.IngredientId, multiplier };
  });

  const multiplosPorId = {};
for (const ingrediente of auxResult) {
  if (multiplosPorId[ingrediente.IngredientId]) {
    multiplosPorId[ingrediente.IngredientId] += ingrediente.multiplier;
  } else {
    multiplosPorId[ingrediente.IngredientId] = ingrediente.multiplier;
  }
}

const result = Object.keys(multiplosPorId).map(ingredienteId => ({
  IngredientId: parseInt(ingredienteId),
  multiplier: multiplosPorId[ingredienteId]
}));
  return result;
}

const generateOldName = (name) => {
    let result = `${name} OLD `;
    const length = 5;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
const validateArraySameStore = async (arr, store_id, model) => {
    const result = await Promise.all(arr.map( async elem => {
        let resu = await model.findOne({where: {id: elem.id,  store_id}})
        return resu instanceof model;
    }))
    //console.log("Arrays: ");
    //let filtered = result.filter((elem => !elem instanceof model))
    //console.log(result);
    //
    return result.filter(e => e != true).length ? false : true;
}

const procesarIngredientsConSet = (ingredientsList) => {
  //* Puede recibir de las 2 maneras.. Ignorará el Layer
  //{ id, name, amount, type_measure },
  //{ id, name, layer, amount },
  //{ id, name, amount }
    const set = ingredientsList.reduce((acc, ingredient) => {
        const name = ingredient.name;
        if (acc[name]) {
          acc[name].amount += ingredient.amount;
        } else {
          acc[name] = {
            id: ingredient.id,
            name: name,
            amount: ingredient.amount,
            type_measure: ingredient.type_measure
          };
        }
        return acc;
      }, {});
      const result = Object.values(set);
      return result;
}

module.exports = {
    isItAnExistingModelByName,
    isItAnExistingModelByID,
    getRecipeBasicAttrsById,
    getActualDate,
    generateOldName,
    validateArraySameStore,
    procesarIngredientsConSet,
    buildBOM,
    removeIngredientsFromMenu
};