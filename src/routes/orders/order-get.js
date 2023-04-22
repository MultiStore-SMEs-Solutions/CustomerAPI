const { Router } = require('express');
const router = Router();
const { processOrderGet, processOrderGetById } = require("../../middleware/order_middleware")


router.get("/", processOrderGet );
router.get("/:id", processOrderGetById );


module.exports = router;
