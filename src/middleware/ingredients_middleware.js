const { Ingredient, Recipe } = require("../db");
const { INVALID_INGREDIENT_NAME, NOT_A_NUMERIC, DUPLICATED_INGREDIENT_NAME,
        INVALID_ID, MUST_CONTAINS_AN_ARRAY, INVALID_MEASURE_TYPE,
        CANT_FIND_INGREDIENT, INVALID_ARRAY,LAYER_BIGGER_ZERO } = require("../models/utils/Ingredient-ErrorMSGs");
const { MEASURES_SHORT } = require("../models/utils/constants");
const { ingredientsPatchController } = require("../controllers/ingredient/ingredient-patch_controler");
const { ingredientsPostController } = require("../controllers/ingredient/ingredient-post_controller");
const { ingredientsGetByIdController, ingredientsGetController } = require("../controllers/ingredient/ingredient-get_controller");
const { ingredientsDeleteController2 } = require("../controllers/ingredient/ingredient-delete_controller")
const { getStoreIdByUserId,  } = require("../controllers/HashFunction/security")
const { isItAnExistingModelByID, isItAnExistingModelByName } = require("../controllers/Utils/aux_controller")
const { validateToken } = require("../controllers/token/token_controller");

const processIngredientPost = async (req, res) => {
  try {
    //! Remastered !//
    const origin = req.headers.origin;
    let store_id = "";
    if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
      const token = req.headers.token;
      const user_id = req.headers.id;
      if ( !token )  throw Error('AccessToken doesnt exist');
      if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
      store_id = await getStoreIdByUserId(user_id);
      }else throw new Error("Access Denied")

    const { name, layer, type_measure, ingredients_all } = req.body;
    await validateIngredient(name, layer, type_measure, ingredients_all, store_id);
    const result = await ingredientsPostController( name, layer, type_measure, ingredients_all, store_id );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const processIngredientDelete = async (req, res) => {
  try {
    //! Remastered !//
    const origin = req.headers.origin;
    let store_id = "";
    const { id } = req.params;
    if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
      const token = req.headers.token;
      const user_id = req.headers.id;
      if ( !token )  throw Error('AccessToken doesnt exist');
      if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
        store_id = await getStoreIdByUserId(user_id);
      }else throw new Error("Access Denied")

    if (id < 1) throw Error(`${INVALID_ID}${id}`);
    if ( !await isItAnExistingModelByID(id, store_id, Ingredient) ) throw Error(`${INVALID_ID}${id}`)
    const result = await ingredientsDeleteController2(id, store_id);
    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const processIngredientGet = async (req, res) => {
  try {
    //! Remastered !//
    const origin = req.headers.origin;
    let store_id = "";
    if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
      const token = req.headers.token;
      const user_id = req.headers.id;
      console.log("Token: "+token);
      console.log("Id: "+user_id);
      if ( !token )  throw Error('AccessToken doesnt exist');
      if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
        store_id = await getStoreIdByUserId(user_id);
    }else throw new Error("Access Denied")

    const result = await ingredientsGetController(store_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const processIngredientGetById = async (req, res) => {
  try {
    //! Remastered !//
    const origin = req.headers.origin;
    let store_id = "";
    if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
      const token = req.headers.token;
      const user_id = req.headers.id;
      if ( !token )  throw Error('AccessToken doesnt exist');
      if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
      store_id = await getStoreIdByUserId(user_id);
    }else throw new Error("Access Denied")

    const { id } = req.params;
    if ( isNaN(id) || id < 1) throw Error(`${INVALID_ID}${id}`)
    const result = await ingredientsGetByIdController(id, store_id);
    if ( !result ) throw Error(`${INVALID_ID}${id}`)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const processIngredientPatch = async (req, res) => {
  try {
        //! Remastered !//
        const origin = req.headers.origin;
        let store_id = "";
        if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
            const token = req.headers.token;
            const user_id = req.headers.id;
            if ( !token )  throw Error('AccessToken doesnt exist');
            if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
            store_id = await getStoreIdByUserId(user_id);
        }else throw new Error("Access Denied")

    const { id, name, type_measure } = req.body;
    if (!await isItAnExistingModelByID(id, store_id, Ingredient)) throw Error(`${INVALID_ID}${id}`);
    const result = await ingredientsPatchController(id, name, type_measure, store_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const validateIngredient = async ( name, layer, type_measure, ingredients_all, store_id ) => {
  if (await isItAnExistingModelByName(name, store_id, Ingredient )) throw Error(`${DUPLICATED_INGREDIENT_NAME} ${name}`);
  //if (await (name)) throw Error(DUPLICATED_RECIPE_NAME);
  if (!name.trim().length || !name) throw Error(INVALID_INGREDIENT_NAME);
  if (isNaN(layer)) throw Error(`${NOT_A_NUMERIC}${layer}`);
  if (layer < 0) throw Error(LAYER_BIGGER_ZERO);
  if (layer == 0 && ingredients_all.length != 0) throw Error(INVALID_ARRAY);
  if (layer > 0 && ingredients_all.length < 1) throw Error(MUST_CONTAINS_AN_ARRAY);
  if (!MEASURES_SHORT.includes(type_measure)) throw Error(`${type_measure}${INVALID_MEASURE_TYPE}`);
};

module.exports = {
  processIngredientPost,
  processIngredientPatch,
  processIngredientGet,
  processIngredientGetById,
  processIngredientDelete,
};
