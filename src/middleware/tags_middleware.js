const { Tag } = require("../db");
const { tagsPostController } = require("../controllers/tag/tag-post_controller")
const { tagsPatchController } = require("../controllers/tag/tag-patch_controller")
const { tagsGetController } = require("../controllers/tag/tag-get_controller")
const { isItAnExistingModelByID, isItAnExistingModelByName } = require("../controllers/Utils/aux_controller")
const { tagsDeleteController } = require("../controllers/tag/tag-delete_controller")
const { getStoreIdByUserId, getStoreIDByStoreName } = require("../controllers/HashFunction/security");
const { INVALID_TAG_ID, DUPLICATED_TAG_NAME, INVALID_TAG_NAME } = require("../models/utils/Tag-ErrorMSGs") 
const { tagsApplyController } = require("../controllers/tag/tag-apply_controller")
const { validateToken } = require("../controllers/token/token_controller");

const processTagMenuPost = async (req, res) => {
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

        const { tagsIds, menuItemId } = req.body;
    //!! Sin Validacion
        const result = await tagsApplyController(tagsIds, menuItemId, store_id)
        return res.status(200).json( result )
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const processTagPost = async (req,res) => {
try {
    const { name } = req.body;
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

    await validateTagPost(name, store_id )
    const result = await tagsPostController( name, store_id )
    return res.status(200).json( result )
} catch (error) {
    return res.status(400).json({ error: error.message })
}
}


const processTagPatch = async (req,res) => {
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

    const { id, name } = req.body;

    if ( !await isItAnExistingModelByID(id, store_id, Tag )) throw Error(`${INVALID_ID}${id}`)

    const result = await tagsPatchController(id, name, store_id);
    return res.status(200).json( result )
} catch (error) {
    return res.status(400).json({ error: error.message })
}
}


const processTagGet = async (req,res) => {
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
    }else if ( origin === process.env.HEADERS_CUSTOMER_ORIGIN_DEPLOY){
        const short_name = req.headers.storename;
        store_id = await getStoreIDByStoreName(short_name);
    }
    else throw new Error("Access Denied")

    const result = await tagsGetController(store_id);
    return res.status(200).json( result )
} catch (error) {
    return res.status(400).json({ error: error.message })
}
}

const validateTagPost = async ( name, store_id ) => {
if (!name.trim() || typeof name != "string") throw Error(INVALID_TAG_NAME);
if ( await isItAnExistingModelByName(name, store_id, Tag ) ) throw Error(`${DUPLICATED_TAG_NAME}${name}`);
return true;
}

const processTagDelete = async (req,res) => {
try {
    //! Remastered !//
    let mustFilter = true;
    const origin = req.headers.origin;
    let store_id = "";
    if ( origin === process.env.HEADERS_STORE_ORIGIN_DEPLOY){
        const token = req.headers.token;
        const user_id = req.headers.id;
        if ( !token )  throw Error('AccessToken doesnt exist');
        if ( !await validateToken(user_id, token ) ) throw Error("Token is invalid or expired, Please log in again.")
        store_id = await getStoreIdByUserId(user_id);
    }else throw new Error("Access Denied")

    const { id } = req.query;
    if ( id < 1) throw Error(`${INVALID_ID}${id}`);
    if ( await !isItAnExistingModelByID( id, store_id, Tag ) ) throw Error(`${INVALID_TAG_ID}${id}`)
    const result = await tagsDeleteController( id, store_id );
    return res.status(200).json( result )
} catch (error) {
    return res.status(400).json({ error: error.message })
}
}
module.exports = {
processTagPost,
processTagGet,
processTagDelete,
processTagPatch,
processTagMenuPost

}