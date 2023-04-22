const { MenuItem, Order, OrdersMenu, Op } = require("../../db");
const { buildBOM } = require("../Utils/aux_controller")

const orderGetPredictionController = async (toPredict) => {
    return await buildBOM(toPredict)
}

module.exports = {
    orderGetPredictionController
};