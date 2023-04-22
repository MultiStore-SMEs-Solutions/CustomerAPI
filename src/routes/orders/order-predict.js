const { Router } = require('express');
const router = Router();
const { processOrderPrediction } = require("../../middleware/order_middleware")

router.put("/", processOrderPrediction );


module.exports = router;