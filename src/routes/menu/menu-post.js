const { Router } = require('express');
const router = Router();
const { processMenuPost } = require("../../middleware/menu_middleware")

router.post("/", processMenuPost);

module.exports = router;