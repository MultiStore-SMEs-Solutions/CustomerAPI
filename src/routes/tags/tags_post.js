const { Router } = require('express');
const router = Router();
const { processTagPost } = require("../../middleware/tags_middleware")

router.post("/", processTagPost );

module.exports = router;