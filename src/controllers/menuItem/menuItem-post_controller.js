const { MenuItem, IngredientsMenuItems } = require("../../db");
const { ERROR_CANT_CREATE } = require("../../models/utils/MenuItem-ErrorMSGs")
const { tagsApplyController } = require("../tag/tag-apply_controller")
//! TEST
const {cloudinary} = require("../../utils/cloudinary")
//! FIN


const menuItemsPostController = async (name, description, price, recomend_first = false , stock, is_active, url_image, ingredArray, store_id, tagsIds ) => {
  //!HARDCODEO porque el formic no hace magia antes de enviar
  const uploadedResponse = await cloudinary.uploader.upload( url_image, {upload_preset: process.env.CR_DEFAULT_FOLDER})
  let url = uploadedResponse.secure_url
  //!FIN
  const result = await MenuItem.create({name,description,price,recomend_first,stock,is_active, url_image: url, store_id});
  console.log(result.dataValues);
  const menuItemId = result.dataValues.id
   if (tagsIds && tagsIds.length) await tagsApplyController(tagsIds, menuItemId, store_id)

  //! Este if Parece Opcional
  if ( !result ) throw Error(ERROR_CANT_CREATE)
  Promise.all( ingredArray.map( ingred => {
    IngredientsMenuItems.create({MenuItemId: result.id, IngredientId: ingred.id, quantity: ingred.quantity})
  }))
  delete result.dataValues.store_id
  delete result.dataValues.updatedAt
  delete result.dataValues.createdAt
  delete result.dataValues.deletedAt
  return result;
};

module.exports = {
  menuItemsPostController
};