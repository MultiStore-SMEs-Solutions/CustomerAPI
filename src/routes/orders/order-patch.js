const { Router } = require('express');
const router = Router();
const { processOrderPatch } = require("../../middleware/order_middleware")

router.patch("/", processOrderPatch );

module.exports = router;