const { MenuItem, IngredientsMenuItem } = require("../../db");

const menuItemsDeleteController = async (id, store_id) => {
  //! Retrabajado
  const result = await MenuItem.destroy({where: {id, store_id}})
  await IngredientsMenuItem.destroy({where: {MenuItemId: id }})
  return result;
  //*
  /*
  try {
    
      await MenuItem.destroy({where: {id}});

  } catch (err) {
    return err.message;
  }*/
};

module.exports = { menuItemsDeleteController };
