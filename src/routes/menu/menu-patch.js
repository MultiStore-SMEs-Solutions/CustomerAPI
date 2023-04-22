const { Router } = require('express');
const router = Router();
const { processMenuPatch } = require("../../middleware/menu_middleware")

router.patch("/", processMenuPatch );

module.exports = router;