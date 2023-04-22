const { or } = require("sequelize");
const { Order } = require("../../db");
const { ORDER_STATUS } = require("../../models/utils/constants")


const paymentsSuccessProcess = async (successResponse) => {
  let redirectUrl = process.env.CUSTOMER_DEV_URL_SUCCESS || process.env.CUSTOMER_DEPLOY_URL_SUCCESS;
  //let order = await Order.update({status: ORDER_STATUS[1], payment_data: successResponse, where: {id: successResponse.code}})
  await Order.update( { status: ORDER_STATUS[1], payment_data: successResponse },
                                  { where: { id: successResponse.code } });
  let order = await Order.findOne({where: {id: successResponse.code}})


  return `${redirectUrl}${order.code}`
};

module.exports = { paymentsSuccessProcess };
