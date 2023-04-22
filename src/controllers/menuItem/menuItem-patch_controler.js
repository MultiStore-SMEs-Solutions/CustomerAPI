const { MenuItem } = require("../../db");

const menuItemsPatchController = async (id,name,description,price,recomend_first,stock,is_active,url_image, store_id ) => {
  //! TODO
  // Considerar agregar Construccion de un objeto a pasar para la modificacion
  const result = await MenuItem.update({ name,description, price, recomend_first, stock,is_active, url_image },
                                              { where: { id, store_id } });
  return result;
};

module.exports = {
  menuItemsPatchController
};
