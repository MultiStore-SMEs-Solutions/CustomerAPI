const { Router } = require('express');
const router = Router();
const { processMenuGet, processMenuGetById, processMenuGetRecommended } = require("../../middleware/menu_middleware")

router.get("/", processMenuGet);
router.get("/recommended", processMenuGetRecommended);
router.get("/:id", processMenuGetById);

module.exports = router;