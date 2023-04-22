const { Router } = require('express');
const router = Router();
const { processTagGet } = require("../../middleware/tags_middleware")

router.get("/", processTagGet);

module.exports = router;