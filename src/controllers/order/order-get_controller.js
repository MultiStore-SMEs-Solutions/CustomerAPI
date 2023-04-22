const { MenuItem, Order, OrdersMenu, Review, Op } = require("../../db");
const { buildBOM } = require("../Utils/aux_controller")

const orderGetBalanceController = async ( store_id, startDate = "2000-01-01", endDate="2500-12-31" ) => {
console.log("hola")
  const orders = await Order.findAll({
    where: {
      store_id,
      status: { [Op.in]: ["Entregada"] },
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: MenuItem,
        attributes: {
          exclude: [
            "description", "recomend_first",  "is_active", "store_id", "createdAt", "updatedAt", "deletedAt",
          ],
        },
      },
    ],
    attributes: {
      exclude: [
        "updatedAt", "deletedAt", "payment_data", "store_id", "status", "client_data",
      ],
    },
    order: [["updatedAt", "DESC"]],
  });
  console.log("mazo"+orders.length)
  const auxOrderIds = await orders.map((o) => {
    return o.dataValues.id;
  });
  
  // //! Modularizar
  //! Comentado por cambios a pedido de david
  const totalSales = await getTotalSales(auxOrderIds);
  const result = await OrdersMenu.findAll({ where: { OrderId: auxOrderIds } });
  let ordersMenuCount = getTotalMenuItems(result);
  let menuItemsIds = ordersMenuCount.map((e) => e.MenuItemId);
  let processedMenus = await buildDetailMenuItem(ordersMenuCount, menuItemsIds);

  const ticketsAll = orders.map((order) => {
    return {
      totalAmountPerorder: order.total,
      code: order.code,
      orderDate: order.createdAt,
      productsOfOrder: order.MenuItems.map((menu) => {
        return {
          name: menu.name,
          quantityPerOrder:menu.OrdersMenu.quantity,
          productPrice :menu.price,
          url_image: menu.url_image,
          totalAmountOfProductPerOrder: menu.price * menu.OrdersMenu.quantity,
        };
      }),
    };
  });

  let billOfMaterials = await buildBOM(processedMenus);
  return {ticketsAll, totalSales, salesPerMenu: processedMenus, billOfMaterials  };
};

const buildDetailMenuItem = async (salesPerMenu, menuItemsId) => {
  let result;
  await MenuItem.findAll({
    attributes: ["id", "name", "url_image"],
    where: { id: menuItemsId },
  })
    .then((menuItems) => {
      const updatedSalesPerMenu = salesPerMenu.map((sale) => {
        const menuItem = menuItems.find((item) => item.id === sale.MenuItemId);
        return {
          MenuItemId: sale.MenuItemId,
          name: menuItem.name,
          url_image: menuItem.url_image,
          quantity: sale.quantity,
        };
      });
      result = updatedSalesPerMenu;
    })
    .catch((error) => {
      //! Habilitar para manejar Errores
      //result = `Error al obtener los MenuItem: ${error}`;
    });
  return result;
};


const getTotalSales = async (ordersIds) => {
  let result;
  await Order.sum("total", { where: { id: ordersIds } })
    .then((total) => {
      result = total;
    })
    .catch((error) => {
      result = `We couldn't find any sales between this dates`;
  });

  return await result;
};

const getTotalMenuItems = (arrayOrdersMenu) => {
  const result = arrayOrdersMenu.reduce((acc, objeto = objeto.dataValues) => {
    const menuItemId = objeto.MenuItemId;
    const quantity = objeto.quantity;
    const existing = acc.find((item) => item.MenuItemId === menuItemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      acc.push({ MenuItemId: menuItemId, quantity: quantity });
    }
    return acc;
  }, []);

  return result;
};

const orderGetController = async ( store_id, email ) => {
  let result;

  email
    ? (result = await Order.findAll({
        //! limit: 120,
        where: {
          store_id,
          status: { [Op.notIn]: ["Sin Pagar"] },
          client_data: {
            [Op.contains]: {
              email: email
            }
          }
        },
        include: [{ model: MenuItem, attributes: ["name", "url_image"] }],
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        order: [["createdAt", "DESC"]],
      }))
    : (result = await Order.findAll({
        where: {
          store_id,
          status: { [Op.notIn]: ["Sin Pagar", "Entregada", "Cancelada"] },
        },
        include: [{ model: MenuItem, attributes: ["name", "url_image"] }],
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        order: [["createdAt", "DESC"]],
      }));
  return result;
};

const orderGetByIdController = async ( id ) => {
 
  let existingRewiew = await Review.findAll({ where: { OrdersMenuId: id } });
  let result = await Order.findOne({
    where: { id: id },
    include: [{ model: MenuItem, attributes: ["name", "url_image"] }],
  });
  if (!existingRewiew.length) {
    return result;
  } else {
    result.dataValues.hasReview = true;
    result.dataValues.Review = existingRewiew;

    return result;
  }
};

const ProgressOrdersController = async () => {
    const resultOrder = await Order.findAll({
      where: { status: { [Op.in]: ["En Progreso"] } },
      include: [{ model: MenuItem }],
    });

    return resultOrder
}

module.exports = {
  ProgressOrdersController,
  orderGetController,
  orderGetByIdController,
  orderGetBalanceController,
};
