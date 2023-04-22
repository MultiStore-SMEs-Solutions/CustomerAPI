const { Recipe, Ingredient } = require("../db");
const { INVALID_RECIPE_NAME, DUPLICATED_RECIPE_NAME, INVALID_PRODUCED_AMOUNT, MIN_PROD_AMOUNT,
        INVALID_INGREDIENTS_ARRAY, INVALID_TYPE_MEASURE, INVALID_ID, DUPLICATED_INGREDIENT_NAME,
        INVALID_ARRAY_CONTENT } = require("../models/utils/Recipe-ErrorMSGs")
const { MEASURES_SHORT } = require("../models/utils/constants")
const { recipesPostController } = require("../controllers/recipe/recipe-post_controller")
const { recipesGetController, recipesGetByIdController } = require("../controllers/recipe/recipe-get_controller")
const { recipesDeleteController } = require("../controllers/recipe/recipe-delete_controller")
const { recipesPatchController } = require("../controllers/recipe/recipe-patch_controller")
const { isItAnExistingModelByName, getRecipeBasicAttrsById, getActualDate, validateArraySameStore,
        isItAnExistingModelByID } = require("../controllers/Utils/aux_controller")
const { validateToken } = require("../controllers/token/token_controller");
const { getStoreIdByUserId } = require("../controllers/HashFunction/security")

//* Adds storeId && Headers Validation note
const processRecipePost = async (req,res) => {
    try {
        //! Remastered
        const origin = req.headers.origin;
        let store_id = "";
        if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
            const token = req.headers.token;
            const user_id = req.headers.id;
            if ( !token )  throw Error('AccessToken doesnt exist');
            if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
            store_id = await getStoreIdByUserId(user_id);
        }else throw new Error("Access Denied")

        //! agregar Validacion de que todos los IDs de ingredArray son del store_id

        const { name, details, produced_amount, type_measure, ingredArray } = req.body;
        //! Validar si todos los ingredientes son del MISMO store
        await validateRecipePost(name, details, produced_amount, type_measure, ingredArray, store_id )
        const result = await recipesPostController( name, details, produced_amount, type_measure, ingredArray, store_id )
        return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const processRecipePostRebuild = async (id, name, details, produced_amount, type_measure, ingredArray, store_id) => {
    validateRecipePost( name, details, produced_amount, type_measure, ingredArray, store_id);
    if ( !isItAnExistingModelByID( id, store_id, Recipe )) throw Error(`${INVALID_ID}${id}`);
    const oldRecipe = getRecipeBasicAttrsById(id, store_id);
    let actualDate = getActualDate();
    //! campo Name no soporta (yyyy/mm/dd) quizas reemplazar por " OLD RECIPE"
    await recipesPatchController(oldRecipe.id, oldRecipe.name+actualDate, oldRecipe.details, oldRecipe.type_measure, store_id);
    const result = await recipesPostController( name, details, produced_amount, type_measure, ingredArray, store_id )
    //! Falta verificar si hay recipes de layer superior que usen esta receta y modificarlo
    return result;
}

const processRecipePatch = async (req,res) => {
    try {
        //! Remastered
        const origin = req.headers.origin;
        let store_id = "";
        if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
            const token = req.headers.token;
            const user_id = req.headers.id;
            if ( !token )  throw Error('AccessToken doesnt exist');
            if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
            store_id = await getStoreIdByUserId(user_id);
        }else throw new Error("Access Denied")

        const { id, name, details } = req.body;
        if ( isNaN(id) || id < 1) throw Error(INVALID_ID)
        if (    !await isItAnExistingModelByID(id, store_id, Recipe)
            ||  await isItAnExistingModelByName(name, store_id, Ingredient)) throw Error(`${INVALID_ID}${id}`)
        //if ( type_measure && !MEASURES_SHORT.includes(type_measure) ) throw Error(`${type_measure}${INVALID_TYPE_MEASURE}`)
        //! TODO
        //if ( !await validateArraySameStore(ingredArray, store_id, Recipe)) throw Error(INVALID_ARRAY_CONTENT)
        //const result = !ingredArray && !ingredArray.length ?
        //                            await recipesPatchController(id, name, details, type_measure, store_id)
        //                          : await recipesPostControllerRebuild(id, name, details, produced_amount, type_measure, ingredArray, store_id)
        const result = await recipesPatchController(id, name, details, store_id);
        return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const processRecipeGet = async (req,res) => {
    try {
         //! Remastered
         const origin = req.headers.origin;
         let store_id = "";
         if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
             const token = req.headers.token;
             const user_id = req.headers.id;
             if ( !token )  throw Error('AccessToken doesnt exist');
             if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
             store_id = await getStoreIdByUserId(user_id);
         }else throw new Error("Access Denied")

        const result = await recipesGetController(store_id);
        return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const processRecipeGetById = async (req,res) => {
    try {
        //! Remastered
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
        const result = await recipesGetByIdController( id, store_id )
        if ( !result ) throw Error(`${INVALID_ID}${id}`)
        return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const validateRecipePost = async ( name, details, produced_amount, type_measure, ingredArray, store_id ) => {
    let result = true;
    if (!name.trim() || typeof name != "string") throw Error(INVALID_RECIPE_NAME);
    if ( await isItAnExistingModelByName(name, store_id, Ingredient) ) throw Error(`${DUPLICATED_RECIPE_NAME}${name}`);
    if ( await isItAnExistingModelByName(name, store_id, Recipe) ) throw Error(`${DUPLICATED_INGREDIENT_NAME}${name}`);
    if ( produced_amount < MIN_PROD_AMOUNT) throw Error(INVALID_PRODUCED_AMOUNT);
    if (!ingredArray.length) throw Error(INVALID_INGREDIENTS_ARRAY)
   // if ( !await validateArraySameStore(ingredArray, store_id, Recipe)) throw Error(INVALID_ARRAY_CONTENT)
    if ( !MEASURES_SHORT.includes(type_measure) ) throw Error(`${type_measure}${INVALID_TYPE_MEASURE}`)
    return result;
}

const processRecipeDelete = async (req,res) => {
    try {
        //! Remastered
        const origin = req.headers.origin;
        let store_id = "";
        if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
            const token = req.headers.token;
            const user_id = req.headers.id;
            if ( !token )  throw Error('AccessToken doesnt exist');
            if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
            store_id = await getStoreIdByUserId(user_id);
            mustFilter = false;
        }else throw new Error("Access Denied")

        const { id } = req.query;
        if ( id < 1) throw Error(`${INVALID_ID}${id}`);
        if ( !await isItAnExistingModelByID(id, store_id, Recipe ) ) throw Error(`${INVALID_ID}${id}`)

        const result = await recipesDeleteController( id, store_id );
         return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports = {
    processRecipePost,
    processRecipeGet,
    processRecipeGetById,
    processRecipeDelete,
    processRecipePatch

}