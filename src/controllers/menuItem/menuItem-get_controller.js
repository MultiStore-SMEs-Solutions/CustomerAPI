const { MenuItem, Ingredient, Tag, Review, conn } = require("../../db");
//[ "Sin Pagar", "En Progreso", "Cancelada", "Lista", "Entregada" ]

const menuItemsGetController = async (store_id) => {
  const result = await MenuItem.findAll({
    where: { store_id },
    include: [{ model: Tag, attributes: ["name"] }, { model: Ingredient }],
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
      include: [
        [
          conn.literal(
            '(SELECT COALESCE(AVG("Reviews"."rating"), 0) FROM "Reviews" WHERE "MenuItem"."id" = "Reviews"."MenuItemId")'
          ),
          "rating",
        ],
      ],
    },
    order: [["recomend_first", "DESC"]],
  })
  return filterMenuItems(result);
};

const menuItemsGetRecommendedController = async (store_id) => {
  const result = await MenuItem.findAll({
    where: { recomend_first: true, store_id },
    include: [{ model: Tag, attributes: ["name"] }, { model: Ingredient }],
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],

      include: [[conn.literal('(SELECT COALESCE(AVG("Reviews"."rating"), 0) FROM "Reviews" WHERE "MenuItem"."id" = "Reviews"."MenuItemId")'), 'rating']]
    },
  });

  return filterMenuItems(result);
};

const filterMenuItems = (arr) => {
  const result = arr.map((item) => {

    const totalSold = item.dataValues.totalSold !== undefined ? item.dataValues.totalSold : null

    const tagsArray = item.Tags.map((tag) => tag.name);
    return {
      id: item.id,
      rating: item.dataValues.rating,
      totalSold: totalSold,
      name: item.name,
      description: item.description,
      price: item.price,
      recomend_first: item.recomend_first,
      stock: item.stock,
      is_active: item.is_active,
      url_image: item.url_image,
      //store_id: item.store_id,
      TagsFull: item.Tags,
      Tags: tagsArray,
      Ingredients: item.Ingredients,
    };
  });
  return result;
};

const menuItemsGetByIdController = async (id, store_id) => {
  const result = await MenuItem.findOne({
    where: { id, store_id },
    include: [{ model: Tag, attributes: ["name"] }, { model: Ingredient }],
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
      include: [
        [
          conn.literal(
            '(SELECT COALESCE(AVG("Reviews"."rating"), 0) FROM "Reviews" WHERE "MenuItem"."id" = "Reviews"."MenuItemId")'
          ),
          "rating",
        ],
        [
          conn.literal(
            '(SELECT COALESCE(SUM("OrdersMenus"."quantity"), 0) FROM "Orders" INNER JOIN "OrdersMenus" ON "Orders"."order_id" = "OrdersMenus"."OrderId" WHERE "Orders"."status" = \'Entregada\' AND "OrdersMenus"."MenuItemId" = "MenuItem"."id")'
          ),
          "totalSold",
        ],
      ],
    },
  });
  return filterMenuItems([result])[0];
};

module.exports = {
  menuItemsGetController,
  menuItemsGetByIdController,
  menuItemsGetRecommendedController,
};
