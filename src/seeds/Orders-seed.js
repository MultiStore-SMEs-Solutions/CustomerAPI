const { Order, OrdersMenu, MenuItem } = require("../db");

const FAKE_ORDERS = [
  {total:55, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A000", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:25, client_data: {"email":"eduardo.ariasu16@gmail.com"}, code:"A001", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"eduardo.ariasu16@gmail.com"}, code:"A002", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"eduardo.ariasu16@gmail.com"}, code:"A003", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"eduardo.ariasu16@gmail.com"}, code:"A004", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"eduardo.ariasu16@gmail.com"}, code:"A005", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"eduardo.ariasu16@gmail.com"}, code:"A006", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A007", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A008", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A009", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A010", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A011", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "En Progreso"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A012", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A013", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"alpharus2k@gmail.com"}, code:"A014", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A015", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A016", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A017", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A018", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A019", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Lista"},
  {total:60, client_data: {"email":"gibsonavilan@gmail.com"}, code:"A020", store_id: "f3bc0474-620c-429d-a46c-df2460c7725a", status: "Entregada"},
  
];
const FAKE_ORDERSMENUS = [
  { quantity: 5, OrderId: 6, MenuItemId: 1 },
  { quantity: 5, OrderId: 6, MenuItemId: 3 },

  { quantity: 5, OrderId: 7, MenuItemId: 5 },

  { quantity: 5, OrderId: 8, MenuItemId: 6 },
  { quantity: 5, OrderId: 8, MenuItemId: 10 },

  { quantity: 5, OrderId: 9, MenuItemId: 11 },

  { quantity: 5, OrderId: 10, MenuItemId: 15 },

  { quantity: 5, OrderId: 11, MenuItemId: 12 },

  { quantity: 5, OrderId: 12, MenuItemId: 13 },

  { quantity: 5, OrderId: 8, MenuItemId: 19 },

  { quantity: 5, OrderId: 13, MenuItemId: 18 },

  { quantity: 5, OrderId: 14, MenuItemId: 10 },
  { quantity: 5, OrderId: 14, MenuItemId: 2 },

  { quantity: 5, OrderId: 15, MenuItemId: 3 },
  { quantity: 5, OrderId: 15, MenuItemId: 4 },

  { quantity: 5, OrderId: 16, MenuItemId: 5 },
  { quantity: 5, OrderId: 16, MenuItemId: 6 },

  { quantity: 5, OrderId: 17, MenuItemId: 7 },
  { quantity: 5, OrderId: 17, MenuItemId: 8 },

  { quantity: 5, OrderId: 18, MenuItemId: 9 },
  { quantity: 5, OrderId: 18, MenuItemId: 10 },

  { quantity: 5, OrderId: 19, MenuItemId: 1 },
  { quantity: 5, OrderId: 19, MenuItemId: 2 },

  { quantity: 5, OrderId: 20, MenuItemId: 13 },
  { quantity: 5, OrderId: 20, MenuItemId: 2 },

  { quantity: 5, OrderId: 21, MenuItemId: 3 },
  { quantity: 5, OrderId: 21, MenuItemId: 4 },

  { quantity: 5, OrderId: 22, MenuItemId: 5 },
  { quantity: 5, OrderId: 22, MenuItemId: 6 },

  { quantity: 5, OrderId: 23, MenuItemId: 7 },

  { quantity: 5, OrderId: 24, MenuItemId: 8 },
  { quantity: 5, OrderId: 24, MenuItemId: 9 },
  { quantity: 5, OrderId: 24, MenuItemId: 10 },

  { quantity: 5, OrderId: 25, MenuItemId: 11 },
  { quantity: 5, OrderId: 25, MenuItemId: 12 },
  { quantity: 5, OrderId: 25, MenuItemId: 13 },
  { quantity: 5, OrderId: 26, MenuItemId: 14 },
  { quantity: 5, OrderId: 26, MenuItemId: 15 },
  { quantity: 5, OrderId: 26, MenuItemId: 16 },
  { quantity: 5, OrderId: 26, MenuItemId: 1 },
  { quantity: 5, OrderId: 26, MenuItemId: 2 },
  { quantity: 5, OrderId: 26, MenuItemId: 3 },
];

module.exports = async function () {
  setTimeout(async () => {
    const promises = [
      await Order.bulkCreate(FAKE_ORDERS),
      await OrdersMenu.bulkCreate(FAKE_ORDERSMENUS),
    ];
    try {
      await Promise.all(promises);
      console.log("orders created");
    } catch (error) {
      console.log(error.message);
    }
  }, 5000);
};
