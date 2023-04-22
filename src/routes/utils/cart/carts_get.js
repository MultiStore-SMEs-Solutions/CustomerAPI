const { Router } = require('express');
const router = Router();
const { getUserCart } = require("../../../middleware/cart_middleware")

router.get("/:id", getUserCart );

module.exports = router;