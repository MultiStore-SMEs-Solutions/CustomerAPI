// const request = require('request')
const { MenuItem } = require("../../db");
const mercadopago = require("mercadopago");
const { getMercadoPagoSuccessUrl, getMercadoPagoFailureUrl } = require("../HashFunction/security")
const { ordersPostController } = require("../order/order-post_controller")

const paymentsControllerPost = async (products, client_data, store_id) => {
  let productDataToMercadoPago = await buildMercadoPagoObject(products);
  mercadopago.configure({
    public_key: process.env.MERCADOPAGO_PUBLIC_KEY,
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });
  let mercadoPagoSuccessUrl = getMercadoPagoSuccessUrl();
  let mercadoPagoFailureUrl = getMercadoPagoFailureUrl();
  let code = await ordersPostController( products, client_data, store_id );
  let preference = buildMercadoPagoPreference(productDataToMercadoPago, mercadoPagoSuccessUrl, mercadoPagoFailureUrl, code)
  try {
    const result = await mercadopago.preferences.create(preference);
    return result;
  } catch (error) {
    return error.message;
  }
};


const buildMercadoPagoPreference = (productDataToMercadoPago, mercadoPagoSuccessUrl, mercadoPagoFailureUrl, code) => {
  return {
    items: productDataToMercadoPago,
    back_urls: {
      success: `${mercadoPagoSuccessUrl}/?code=${code}&`,
      failure: `${mercadoPagoFailureUrl}`,
      pending: "",
    },
    auto_return: "all",
    binary_mode: true,
  };
}


const buildMercadoPagoObject = async (products) => {
  let productDataToMercadoPago = [];
  for (let i = 0; i < products.length; i++) {
    let preference = await getData(products[i].id);
    productDataToMercadoPago.push({
      id: preference.id,
      tittle: preference.name,
      currency_id: "ARS",
      description: preference.description.slice(0, 255),
      category_id: "art",
      quantity: products[i].quantity,
      unit_price: preference.price,
    });
  }
  return productDataToMercadoPago;
}

// función para obtener el precio de un producto dado su ID y otros datos necesarios
const getData = async (productId) => {
  const product = await MenuItem.findByPk(productId);
  return product.dataValues;
};


module.exports = { paymentsControllerPost };
