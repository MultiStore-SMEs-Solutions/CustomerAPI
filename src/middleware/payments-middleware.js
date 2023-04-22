const { validateArraySameStore } = require("../controllers/Utils/aux_controller");
const { MenuItem } = require("../db");
const { paymentsControllerPost } = require("../controllers/Payments/payments-controller")
const { getStoreIDByStoreName } = require("../controllers/HashFunction/security")


const paymentsMiddleware = async (req, res) => {
    try {
        //! Remastered !//
        const origin = req.headers.origin;
        let store_id = "";
        if ( origin === process.env.HEADERS_CUSTOMER_ORIGIN_DEPLOY){
            const short_name = req.headers.storename;
            store_id = await getStoreIDByStoreName(short_name);
        } else throw new Error("Access Denied")

        const {products, client_data} = req.body;
        if (!Array.isArray(products)) throw new Error( "Request body must be an array");
        if (!products.length) throw new Error("Request body must contain at least one product");

        if ( !validateArraySameStore(products,store_id,MenuItem)) throw new Error("Products belongs to diferent Stores!");

        products.forEach((product) => {
          if (typeof product !== "object") throw new Error("Request body must be an objects Array");
          if ( !product.hasOwnProperty("id") || !product.hasOwnProperty("quantity") )
          throw new Error("Each product must have a id property and quantity property");
          if (
            typeof product.id !== "number" ||
            typeof product.quantity !== "number"
          )
          throw new Error("product_id and quantity properties must be a number");
          if (product.quantity < 1 )  throw new Error("Quantity must be bigger than 1");
        });

        const result  = await paymentsControllerPost(products, client_data, store_id)
        return res.status(200).send(result.body.init_point)
    } catch (error) {
        return res.status(400).send(error.message)
    }
  }



module.exports = {
  paymentsMiddleware,
};
